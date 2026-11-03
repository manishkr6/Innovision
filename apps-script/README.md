# Registration backend setup

Registrations go into one Google Sheets workbook with one tab per event. This takes about 5 minutes and is done once, from the Google account that should own the data.

1. Create a new spreadsheet at [sheets.new](https://sheets.new) and name it `INNOVISION 2026 Registrations`.
2. Open **Extensions → Apps Script**, replace the editor contents with `Code.gs` from this folder, and save.
3. Pick `setupSheets` in the function dropdown and click **Run**. Approve the permission prompt. The 12 event tabs appear; delete the empty `Sheet1`.
4. Click **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**, deploy, and copy the URL ending in `/exec`.
5. Put the URL in `.env.local` as `VITE_REGISTRATION_URL=<url>` and set the same variable on the host, then rebuild.
6. Share the spreadsheet with group members by email. Use **Viewer** for most people. Do not use "Anyone with the link": it holds students' phone numbers and emails.

"Anyone" in step 4 only lets people call the script; it does not give access to the spreadsheet.

## Coordinator PIN

The PIN is listed as `COORDINATOR_PIN` in `.env.local`, which is not committed. The script can't read that file, so copy it across: in Apps Script open **Project Settings → Script Properties → Add script property**, with the name `COORDINATOR_PIN` and the 5-digit PIN as the value.

Share it with coordinators privately, not in a group where students are. To change it, update the script property; the new PIN works immediately with no redeploy. Update `.env.local` too so the record stays right. Never add a `VITE_` prefix or put it on Vercel: anything named `VITE_` is published in the site's public code.

## Changing the script

Saving `Code.gs` does not change the live site. Use **Deploy → Manage deployments → Edit → New version**, which keeps the same URL.

Team sizes live in `EVENTS` in `Code.gs` and in `teamSize` in `src/data/events.js`. Change both. To change a size after registrations have started, add columns by hand before the `Checked In` column, since `setupSheets` skips existing tabs.

Event times live in `start`/`end` in `Code.gs` and in `slot` in `src/data/events.js`. Change both when the final schedule arrives. An event with no times can't clash with anything. Overlapping registrations are allowed for now; once the schedule is final, set `BLOCK_SCHEDULE_CLASHES` to `true` if overlaps should be refused, and redeploy. Existing rows aren't rechecked, so contact any affected participants.

Set `CLOSES_AT` at the top of `Code.gs` to stop accepting registrations at a set time.

## Running registration

- Give **Editor** access only to the people marking check-ins or fixing rows. Everyone else gets **Viewer**.
- Don't rename tabs, or move or rename columns. The script finds tabs by name and columns by position, so registrations would fail or land in the wrong place.
- To cancel a registration, delete its whole row. That person can then register again.
- To correct a detail, edit the cell. To change a team's members, edit their cells so the duplicate check stays accurate.
- Delete your test rows before sharing the registration link.

## Fest day

Scan a pass's QR code with any phone camera. It opens a page that checks the token against the sheet and shows **Valid pass** or **Not a valid pass**, with the event, name and check-in status. Compare the name with the student's college ID, then enter the 5-digit coordinator PIN on that page and tap **Check in**. The sheet's `Checked In` column fills in with the time. Scanning alone never checks anyone in, and five wrong PINs lock that pass for 15 minutes.

The page is public to anyone with the pass, so it deliberately hides phone numbers, emails and enrollment numbers. Keep the same deployment when you update the script, or QR codes on passes already issued will stop working. Downloading **File → Download → Microsoft Excel** gives an `.xlsx` copy at any time.
