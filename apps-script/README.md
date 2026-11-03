# Registration backend setup

Registrations go into one Google Sheets workbook with one tab per event. This takes about 5 minutes and is done once, from the Google account that should own the data.

1. Create a new spreadsheet at [sheets.new](https://sheets.new) and name it `INNOVISION 2026 Registrations`.
2. Open **Extensions → Apps Script**, replace the editor contents with `Code.gs` from this folder, and save.
3. Pick `setupSheets` in the function dropdown and click **Run**. Approve the permission prompt. The 12 event tabs appear; delete the empty `Sheet1`.
4. Click **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**, deploy, and copy the URL ending in `/exec`.
5. Put the URL in `.env.local` as `VITE_REGISTRATION_URL=<url>` and set the same variable on the host, then rebuild.
6. Share the spreadsheet with group members by email. Use **Viewer** for most people. Do not use "Anyone with the link": it holds students' phone numbers and emails.

"Anyone" in step 4 only lets people call the script; it does not give access to the spreadsheet.

## Changing the script

Saving `Code.gs` does not change the live site. Use **Deploy → Manage deployments → Edit → New version**, which keeps the same URL.

Team sizes live in `EVENTS` in `Code.gs` and in `teamSize` in `src/data/events.js`. Change both. To change a size after registrations have started, add columns by hand before the `Checked In` column, since `setupSheets` skips existing tabs.

Set `CLOSES_AT` at the top of `Code.gs` to stop accepting registrations at a set time.

## Running registration

- Give **Editor** access only to the people marking check-ins or fixing rows. Everyone else gets **Viewer**.
- Don't rename tabs, or move or rename columns. The script finds tabs by name and columns by position, so registrations would fail or land in the wrong place.
- To cancel a registration, delete its whole row. That person can then register again.
- To correct a detail, edit the cell. To change a team's members, edit their cells so the duplicate check stays accurate.
- Delete your test rows before sharing the registration link.

## Fest day

Scan a pass's QR code, which contains only the token, then search for it in the event's tab (Ctrl+F) and mark `Checked In`. Downloading **File → Download → Microsoft Excel** gives an `.xlsx` copy at any time.
