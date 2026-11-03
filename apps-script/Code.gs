/**
 * INNOVISION 2026 registration backend (Google Apps Script, bound to the workbook).
 * Saves each registration to its event's tab and issues the token. See README.md.
 *
 * Keep EVENTS in step with src/data/events.js: min/max are enforced here too,
 * because the browser's checks can be bypassed.
 */

// Set to an ISO time such as '2026-11-19T09:00:00+05:30' to stop accepting registrations.
var CLOSES_AT = null;

var EVENTS = {
  'code-clash':    { tab: 'Code Clash',    prefix: 'COD', min: 1, max: 1, itOnly: true },
  'web-hackathon': { tab: 'Web Hackathon', prefix: 'WEB', min: 2, max: 2, itOnly: true },
  'brain-spark':   { tab: 'Brain Spark',   prefix: 'BRA', min: 2, max: 2 },
  'type-race':     { tab: 'Type Race',     prefix: 'TYP', min: 1, max: 1 },
  'nextpreneur':   { tab: 'NextPreneur',   prefix: 'NEX', min: 1, max: 2 },
  'tech-hunt':     { tab: 'Tech Hunt',     prefix: 'TEC', min: 5, max: 5 },
  'bgmi':          { tab: 'BGMI',          prefix: 'BGM', min: 4, max: 4 },
  'moba-legends':  { tab: 'MOBA Legends',  prefix: 'MOB', min: 5, max: 5 },
  'e-football':    { tab: 'E-Football',    prefix: 'EFO', min: 1, max: 1 },
  'frame-flick':   { tab: 'Frame Flick',   prefix: 'FRA', min: 1, max: 1 },
  'photography':   { tab: 'Photography',   prefix: 'PHO', min: 1, max: 1 },
  'painting':      { tab: 'Painting',      prefix: 'PAI', min: 1, max: 1 }
};

var COL = { TOKEN: 0, AT: 1, ENTRY: 2, TEAM: 3, NAME: 4, ENROLL: 5, EMAIL: 6, PHONE: 7, COLLEGE: 8, COURSE: 9, IT: 10, MEMBERS: 11 };
var BASE_HEADERS = ['Token', 'Registered At (IST)', 'Entry', 'Team Name', 'Name / Team Leader', 'Enrollment No.', 'Email', 'Phone', 'College / University', 'Course & Semester', 'IT Declaration'];
var TOKEN_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** Run once from the editor: creates any missing tab with its header row. Never touches existing rows. */
function setupSheets() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(EVENTS).forEach(function (slug) {
    var event = EVENTS[slug];
    if (book.getSheetByName(event.tab)) return;
    var sheet = book.insertSheet(event.tab);
    var headers = headersFor_(event);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#FDE9C8');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  });
}

function headersFor_(event) {
  var headers = BASE_HEADERS.slice();
  for (var n = 2; n <= event.max; n++) headers.push('Member ' + n + ' Name', 'Member ' + n + ' Enrollment');
  headers.push('Checked In');
  return headers;
}

function doGet() {
  return json_({ ok: true, service: 'innovision-registration' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_(fail_('bad_request', 'The registration could not be read. Please try again.'));
  }
  try {
    return json_(register_(body));
  } catch (err) {
    console.error(err);
    return json_(fail_('server_error', 'Something went wrong saving your registration. Please try again.'));
  }
}

function register_(body) {
  if (CLOSES_AT && new Date() >= new Date(CLOSES_AT)) return fail_('closed', 'Registrations are closed.');
  if (body.website) return fail_('rejected', 'This registration could not be accepted.'); // hidden spam-trap field

  var event = EVENTS[body.eventSlug];
  if (!event) return fail_('bad_request', 'Unknown event.');

  var clean = validate_(body, event);
  if (clean.error) return fail_('invalid', clean.error);

  // One writer at a time, so simultaneous sign-ups can't pass the duplicate check together.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
  } catch (err) {
    return fail_('busy', 'Too many people are registering right now. Please try again in a moment.');
  }
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(event.tab);
    if (!sheet) return fail_('server_error', 'Registration is not set up for this event yet.');
    var rows = sheet.getDataRange().getValues().slice(1);

    var clash = findClash_(rows, clean, event);
    if (clash) return clash;

    var token = newToken_(event, rows);
    var at = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow(toRow_(token, at, clean, event));
    SpreadsheetApp.flush();
    return { ok: true, duplicate: false, token: token, registeredAt: at };
  } finally {
    lock.releaseLock();
  }
}

function validate_(body, event) {
  var c = {
    fullName: text_(body.fullName, 100),
    email: text_(body.email, 120).toLowerCase(),
    phone: String(body.phone || '').replace(/\D/g, '').replace(/^(?:91|0)(?=\d{10}$)/, ''),
    college: text_(body.college, 120),
    course: text_(body.course, 80),
    enrollmentNumber: text_(body.enrollmentNumber, 40),
    teamName: text_(body.teamName, 80),
    members: []
  };
  if (c.fullName.length < 3) return { error: 'Please enter your full name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return { error: 'Please provide a valid email address.' };
  if (!/^[6-9]\d{9}$/.test(c.phone)) return { error: 'Please enter a valid 10-digit phone number.' };
  if (!c.college) return { error: 'Please enter your college or university.' };
  if (!c.course) return { error: 'Please enter your course and semester.' };
  if (!c.enrollmentNumber) return { error: 'Please enter your enrollment number.' };
  if (body.agreedToRules !== true) return { error: 'You must agree to the rules and Code of Conduct.' };
  if (event.itOnly && body.confirmedITStatus !== true) return { error: 'This event is for IT students only.' };

  var members = Array.isArray(body.members) ? body.members : [];
  for (var i = 0; i < members.length; i++) {
    var member = { name: text_(members[i] && members[i].name, 100), enrollment: text_(members[i] && members[i].enrollment, 40) };
    if (!member.name || !member.enrollment) return { error: 'Every teammate needs a name and an enrollment number.' };
    c.members.push(member);
  }
  var size = c.members.length + 1;
  if (size < event.min || size > event.max) {
    return { error: event.min === event.max ? 'This event needs exactly ' + event.max + ' participant(s).' : 'This event needs ' + event.min + ' to ' + event.max + ' participants.' };
  }
  if (size > 1 && !c.teamName) return { error: 'Please enter a team name.' };
  if (size === 1) c.teamName = '';

  var seen = {};
  var all = [c.enrollmentNumber].concat(c.members.map(function (m) { return m.enrollment; }));
  for (var j = 0; j < all.length; j++) {
    var key = norm_(all[j]);
    if (seen[key]) return { error: 'The same enrollment number appears twice: ' + all[j] };
    seen[key] = true;
  }
  c.entrants = seen;
  return c;
}

/** Same leader + email gets their original token back; anyone else already entered is refused. */
function findClash_(rows, clean, event) {
  for (var r = 0; r < rows.length; r++) {
    var row = rows[r];
    var leader = norm_(row[COL.ENROLL]);
    if (leader === norm_(clean.enrollmentNumber) && String(row[COL.EMAIL]).toLowerCase() === clean.email) {
      return { ok: true, duplicate: true, token: String(row[COL.TOKEN]), registeredAt: String(row[COL.AT]), record: fromRow_(row, event) };
    }
    if (clean.entrants[leader]) return alreadyIn_(row[COL.ENROLL]);
    for (var n = 0; n < event.max - 1; n++) {
      var memberEnrollment = row[COL.MEMBERS + n * 2 + 1];
      if (memberEnrollment !== '' && clean.entrants[norm_(memberEnrollment)]) return alreadyIn_(memberEnrollment);
    }
  }
  return null;
}

function alreadyIn_(enrollment) {
  return fail_('already_registered', 'Enrollment number ' + enrollment + ' is already registered for this event. If this is a mistake, contact the event coordinator.');
}

function toRow_(token, at, c, event) {
  var row = [token, at, c.members.length ? 'Team' : 'Individual', asText_(c.teamName), asText_(c.fullName), asText_(c.enrollmentNumber), asText_(c.email), asText_(c.phone), asText_(c.college), asText_(c.course), event.itOnly ? 'Yes' : ''];
  for (var n = 0; n < event.max - 1; n++) {
    var member = c.members[n];
    row.push(member ? asText_(member.name) : '', member ? asText_(member.enrollment) : '');
  }
  row.push('');
  return row;
}

function fromRow_(row, event) {
  var members = [];
  for (var n = 0; n < event.max - 1; n++) {
    var name = row[COL.MEMBERS + n * 2];
    if (name !== '') members.push({ name: String(name), enrollment: String(row[COL.MEMBERS + n * 2 + 1]) });
  }
  return {
    fullName: String(row[COL.NAME]), enrollmentNumber: String(row[COL.ENROLL]), email: String(row[COL.EMAIL]), phone: String(row[COL.PHONE]),
    college: String(row[COL.COLLEGE]), course: String(row[COL.COURSE]), teamName: String(row[COL.TEAM]) || null, teamMembers: members
  };
}

function newToken_(event, rows) {
  var used = {};
  rows.forEach(function (row) { used[row[COL.TOKEN]] = true; });
  var token;
  do {
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid());
    var code = '';
    for (var i = 0; i < 6; i++) code += TOKEN_ALPHABET.charAt((bytes[i] + 256) % TOKEN_ALPHABET.length);
    token = 'IV26-' + event.prefix + '-' + code;
  } while (used[token]);
  return token;
}

function text_(value, maxLength) {
  return String(value === undefined || value === null ? '' : value).replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

// The leading apostrophe makes Sheets store the value as literal text, so "=..." can't run as a
// formula and phone/enrollment numbers keep their exact form. It isn't shown or returned on read.
function asText_(value) {
  return value === '' ? '' : "'" + value;
}

function norm_(value) {
  return String(value).toUpperCase().replace(/[\s\-\/]/g, '');
}

function fail_(code, message) {
  return { ok: false, code: code, message: message };
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
