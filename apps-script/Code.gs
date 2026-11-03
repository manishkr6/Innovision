/**
 * INNOVISION 2026 registration backend (Google Apps Script, bound to the workbook).
 * Saves each registration to its event's tab and issues the token. See README.md.
 *
 * Keep EVENTS in step with src/data/events.js: min/max are enforced here too,
 * because the browser's checks can be bypassed.
 */

// Set to an ISO time such as '2026-11-19T09:00:00+05:30' to stop accepting registrations.
var CLOSES_AT = null;

// Off until the schedule is final: students may register for overlapping events, and the organisers
// update participants later. Set to true to refuse overlaps once start/end below are final.
var BLOCK_SCHEDULE_CLASHES = false;

// start/end are the provisional website timetable. Events without them (E-Football, Frame Flick,
// Photography) have no fixed time yet, so they never clash.
var EVENTS = {
  'code-clash':    { tab: 'Code Clash',    prefix: 'COD', min: 1, max: 1, itOnly: true, start: '10:30', end: '13:30' },
  'web-hackathon': { tab: 'Web Hackathon', prefix: 'WEB', min: 2, max: 2, itOnly: true, start: '09:00', end: '17:30' },
  'brain-spark':   { tab: 'Brain Spark',   prefix: 'BRA', min: 2, max: 2, start: '14:00', end: '16:30' },
  'type-race':     { tab: 'Type Race',     prefix: 'TYP', min: 1, max: 1, start: '11:00', end: '13:00' },
  'nextpreneur':   { tab: 'NextPreneur',   prefix: 'NEX', min: 1, max: 2, start: '13:30', end: '17:00' },
  'tech-hunt':     { tab: 'Tech Hunt',     prefix: 'TEC', min: 5, max: 5, start: '13:30', end: '16:30' },
  'bgmi':          { tab: 'BGMI',          prefix: 'BGM', min: 4, max: 4, start: '11:00', end: '17:00' },
  'moba-legends':  { tab: 'MOBA Legends',  prefix: 'MOB', min: 5, max: 5, start: '12:00', end: '17:00' },
  'e-football':    { tab: 'E-Football',    prefix: 'EFO', min: 1, max: 1 },
  'frame-flick':   { tab: 'Frame Flick',   prefix: 'FRA', min: 1, max: 1 },
  'photography':   { tab: 'Photography',   prefix: 'PHO', min: 1, max: 1 },
  'painting':      { tab: 'Painting',      prefix: 'PAI', min: 1, max: 1, start: '10:30', end: '13:30' }
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

function doGet(e) {
  var token = e && e.parameter && e.parameter.token;
  if (token !== undefined) return verifyPage_(lookupToken_(token));
  return json_({ ok: true, service: 'innovision-registration' });
}

/** Finds a pass by token. Returns only what the public verification page may show. */
function lookupToken_(rawToken) {
  var token = String(rawToken).trim().toUpperCase();
  var match = /^IV26-([A-Z]{3})-[A-Z2-9]{6}$/.exec(token);
  if (!match) return { valid: false, token: token.slice(0, 40) };

  var slugs = Object.keys(EVENTS);
  for (var i = 0; i < slugs.length; i++) {
    var event = EVENTS[slugs[i]];
    if (event.prefix !== match[1]) continue;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(event.tab);
    if (!sheet) break;
    var rows = sheet.getDataRange().getValues().slice(1);
    var checkedInCol = COL.MEMBERS + (event.max - 1) * 2;
    for (var r = 0; r < rows.length; r++) {
      if (String(rows[r][COL.TOKEN]) !== token) continue;
      var mark = String(rows[r][checkedInCol]).trim().toLowerCase();
      return {
        valid: true,
        token: token,
        eventName: event.tab,
        name: String(rows[r][COL.NAME]),
        team: String(rows[r][COL.TEAM]),
        checkedIn: mark !== '' && mark !== 'false' && mark !== 'no',
        sheet: sheet,
        rowNumber: r + 2,
        checkedInColumn: checkedInCol + 1
      };
    }
    break;
  }
  return { valid: false, token: token };
}

var PIN_MAX_FAILURES = 5;
var PIN_LOCK_SECONDS = 900;

/**
 * Called from the verification page. Marks a pass checked in if the coordinator PIN is right.
 * The PIN lives in Script Properties as COORDINATOR_PIN. Wrong tries lock that token for 15 minutes,
 * which stops anyone guessing the PIN from their own pass without locking coordinators out of others.
 */
function checkIn(rawToken, rawPin) {
  var expected = PropertiesService.getScriptProperties().getProperty('COORDINATOR_PIN');
  if (!/^\d{5}$/.test(expected || '')) return { ok: false, message: 'Check-in is not set up yet. Contact the organisers.' };

  var pass = lookupToken_(rawToken);
  if (!pass.valid) return { ok: false, message: 'This is not a valid pass.' };

  var cache = CacheService.getScriptCache();
  var failKey = 'pinfail:' + pass.token;
  var failures = Number(cache.get(failKey)) || 0;
  if (failures >= PIN_MAX_FAILURES) return { ok: false, message: 'Too many wrong PINs for this pass. Try again in 15 minutes.' };
  if (String(rawPin) !== expected) {
    cache.put(failKey, String(failures + 1), PIN_LOCK_SECONDS);
    return { ok: false, message: 'Wrong PIN.' };
  }
  cache.remove(failKey);

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
  } catch (err) {
    return { ok: false, message: 'The system is busy. Please try again.' };
  }
  try {
    pass = lookupToken_(rawToken); // re-read under the lock: rows may have moved or been checked in
    if (!pass.valid) return { ok: false, message: 'This is not a valid pass.' };
    if (pass.checkedIn) return { ok: true, alreadyCheckedIn: true };
    var at = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'HH:mm');
    pass.sheet.getRange(pass.rowNumber, pass.checkedInColumn).setValue('Yes, ' + at);
    SpreadsheetApp.flush();
    return { ok: true, alreadyCheckedIn: false };
  } finally {
    lock.releaseLock();
  }
}

// Public page: anyone holding the pass can open it, so never add phone, email or enrollment here.
function verifyPage_(result) {
  var rows = result.valid
    ? [['Event', result.eventName], result.team ? ['Team', result.team] : null, [result.team ? 'Team leader' : 'Participant', result.name], ['Check-in', result.checkedIn ? 'Already checked in' : 'Not checked in yet']]
    : [];
  var details = rows.filter(Boolean).map(function (row) {
    return '<tr><th>' + escapeHtml_(row[0]) + '</th><td' + (row[0] === 'Check-in' ? ' id="c"' : '') + '>' + escapeHtml_(row[1]) + '</td></tr>';
  }).join('');
  var colour = !result.valid ? '#B91C1C' : result.checkedIn ? '#B45309' : '#15803D';
  var heading = !result.valid ? 'Not a valid pass' : result.checkedIn ? 'Valid pass: already checked in' : 'Valid pass';
  var note = result.valid ? 'Confirm the name against a valid college ID.' : 'This token is not in the INNOVISION 2026 registrations. Please contact the event coordinator.';
  // JSON is safe inside the script tag once "<" is escaped, so a token can't close the tag.
  var checkInForm = result.valid && !result.checkedIn
    ? '<form id="f"><label for="pin">Coordinator PIN</label><input id="pin" type="password" inputmode="numeric" maxlength="5" autocomplete="off" required>' +
      '<button id="b" type="submit">Check in</button></form><p id="m" role="alert"></p>' +
      '<script>var T=' + JSON.stringify(result.token).replace(/</g, '\\u003c') + ';var g=function(i){return document.getElementById(i)};' +
      'g("f").addEventListener("submit",function(e){e.preventDefault();g("b").disabled=true;g("m").textContent="Checking...";' +
      'var d=function(t){g("m").textContent=t;g("b").disabled=false};' +
      'google.script.run.withSuccessHandler(function(r){if(!r.ok){g("pin").value="";return d(r.message)}' +
      'g("f").style.display="none";g("m").textContent="";g("h").textContent=r.alreadyCheckedIn?"Valid pass: already checked in":"Checked in";' +
      'g("c").textContent=r.alreadyCheckedIn?"Already checked in":"Checked in just now";g("top").style.background=r.alreadyCheckedIn?"#B45309":"#1D4ED8"})' +
      '.withFailureHandler(function(){d("Could not reach the sheet. Please try again.")}).checkIn(T,g("pin").value)})</script>'
    : '';
  var html = '<style>body{margin:0;font-family:Arial,sans-serif;color:#1C1917;background:#FAF7F2}' +
    '.head{padding:28px 20px;color:#fff;background:' + colour + '}h1{margin:0;font-size:26px}p{margin:6px 0 0}' +
    '.body{padding:20px}table{width:100%;border-collapse:collapse}th,td{padding:10px 0;text-align:left;border-bottom:1px solid #E7E5E4;font-size:16px}' +
    'th{width:38%;color:#6B7280;font-weight:normal}.token{font-family:monospace;font-size:15px;margin-bottom:12px}.note{color:#6B7280;font-size:14px;margin-top:16px}form{margin-top:20px}label{display:block;font-size:14px;margin-bottom:6px}' +
    'input{width:100%;box-sizing:border-box;padding:12px;font-size:20px;letter-spacing:6px;border:1px solid #A8A29E;border-radius:8px}' +
    'button{width:100%;margin-top:10px;padding:13px;font-size:16px;font-weight:bold;color:#fff;background:#1C1917;border:0;border-radius:8px}#m{color:#B91C1C;font-size:14px}</style>' +
    '<div class="head" id="top"><p>INNOVISION 2026</p><h1 id="h">' + heading + '</h1></div>' +
    '<div class="body"><div class="token">' + escapeHtml_(result.token) + '</div><table>' + details + '</table><p class="note">' + note + '</p>' + checkInForm + '</div>';
  return HtmlService.createHtmlOutput(html).setTitle('INNOVISION 2026 pass check').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function escapeHtml_(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

    var scheduleClash = BLOCK_SCHEDULE_CLASHES ? findScheduleClash_(clean, body.eventSlug) : null;
    if (scheduleClash) return scheduleClash;

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

/** A student can enter many events, but not two that overlap. The fest is one day, so only times are compared. */
function findScheduleClash_(clean, slug) {
  var event = EVENTS[slug];
  if (!event.start) return null;
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var others = Object.keys(EVENTS);
  for (var i = 0; i < others.length; i++) {
    var other = EVENTS[others[i]];
    if (others[i] === slug || !other.start || !(other.start < event.end && event.start < other.end)) continue;
    var sheet = book.getSheetByName(other.tab);
    if (!sheet) continue;
    var rows = sheet.getDataRange().getValues().slice(1);
    for (var r = 0; r < rows.length; r++) {
      var entered = entrantsOf_(rows[r], other);
      for (var e = 0; e < entered.length; e++) {
        if (clean.entrants[norm_(entered[e])]) {
          return fail_('schedule_clash', 'Enrollment number ' + entered[e] + ' is already registered for ' + other.tab + ', which overlaps with this event on the current timetable (' + other.start + ' to ' + other.end + '). One student can only enter events that do not clash.');
        }
      }
    }
  }
  return null;
}

function entrantsOf_(row, event) {
  var entered = [row[COL.ENROLL]];
  for (var n = 0; n < event.max - 1; n++) {
    var enrollment = row[COL.MEMBERS + n * 2 + 1];
    if (enrollment !== '') entered.push(enrollment);
  }
  return entered;
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
