# NexEmber — Coming-Soon Landing Page

A lightweight Next.js site: one landing page, a privacy policy page, and a waitlist form that saves signups to Google Sheets.

```
src/
  app/
    page.tsx              ← landing page (all 6 sections)
    privacy/page.tsx      ← privacy policy
    api/waitlist/route.ts ← receives form submissions, forwards them to Google Sheets
    globals.css           ← all styling (colours are at the top)
    layout.tsx            ← fonts, SEO metadata, analytics
    icon.svg              ← favicon
  components/             ← form, footer, logo, icons
  lib/site.ts             ← brand text + links (read from env variables)
google-apps-script/Code.gs ← paste into the Google Sheet (see step 2)
```

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## 2. Connect the waitlist to Google Sheets (one-time, ~5 min)

1. Create a new Google Sheet in the NexEmber team's Google account, e.g. **"NexEmber Waitlist"**.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in the contents of `google-apps-script/Code.gs`. Save.
3. In Apps Script: **Project Settings (⚙) → Script Properties → Add property**
   - Property: `WAITLIST_SECRET`
   - Value: a long random string (e.g. from a password generator). Keep a copy for step 5.
4. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy, approve the permissions, and copy the **Web app URL** (ends in `/exec`).
5. Put both values in `.env.local` (and later in Vercel):
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=<the Web app URL>
   WAITLIST_SECRET=<the same secret as step 3>
   ```

A **Waitlist** tab with headers is created on the first signup. Duplicate emails are skipped. To export: **File → Download → CSV / Excel**, or share the sheet with team members.

> If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## 3. Deploy (Vercel, free tier is fine)

1. Push this folder to a GitHub repository.
2. At [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. It detects Next.js automatically.
3. Under **Settings → Environment Variables**, add every variable from `.env.example` with real values.
4. Deploy.
5. **Custom domain + HTTPS:** Project → **Settings → Domains** → add `nexember.com` (and `www.nexember.com`). Vercel shows the DNS records to add at your domain registrar. HTTPS certificates are issued automatically.
6. **Analytics:** Project → **Analytics** tab → Enable. This counts page views without cookies.
   Button-click and signup events (`whatsapp_click_*`, `waitlist_signup`, `contact_click`) are already sent from the code. Viewing custom events in the dashboard needs Vercel's Pro plan. On the free plan you still get page views, referrers and countries.

## Source tracking

Every signup row in the sheet records **UTM source / medium / campaign**, the **referring site** and the **landing page**. Use UTM links when you share the page, e.g.:

```
https://nexember.com/?utm_source=instagram&utm_medium=bio&utm_campaign=launch
https://nexember.com/?utm_source=whatsapp&utm_medium=status&utm_campaign=launch
```

## Changing things

| What | Where |
| --- | --- |
| WhatsApp link, contact email, social links, site URL | Environment variables (`.env.local` / Vercel). Redeploy after changing. A social link left empty is hidden. |
| Page copy | `src/app/page.tsx` |
| Colours | Top of `src/app/globals.css` |
| Career-stage options in the form | `src/lib/site.ts` |
| Privacy policy | `src/app/privacy/page.tsx` |
