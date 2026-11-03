# INNOVISION 2026

Marketing and registration site for INNOVISION 2026, the annual IT, technical, gaming and creative fest of the Faculty of Science & Technology, The ICFAI University, Sikkim.

Students browse 12 competitions, register as an individual or a team, and download a PDF pass with a QR code. Registrations are saved to a Google Sheet with one tab per event.

## Run it

```bash
npm ci
cp .env.example .env.local   # then set VITE_REGISTRATION_URL
npm run dev                  # http://localhost:3000
npm run build
```

Without `VITE_REGISTRATION_URL`, the site works but the form won't accept registrations.

## Where things live

- `src/data/events.js`: all event and fest content
- `apps-script/`: the registration backend and its setup guide
- `vercel.json`: routes direct links such as `/events/bgmi` to the app

## Changing team sizes or times

These are stored in both `src/data/events.js` and `apps-script/Code.gs`. Change both, then redeploy the script as a new version so existing passes keep working.
