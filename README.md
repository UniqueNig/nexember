# NexEmber — Coming-Soon Landing Page

A lightweight Next.js site: one landing page and a privacy policy page. Waitlist signups are collected with a Tally form ([tally.so/r/zExG0Z](https://tally.so/r/zExG0Z)).

```text
src/
  app/
    page.tsx              ← landing page (all 6 sections)
    privacy/page.tsx      ← privacy policy
    globals.css           ← all styling (colours are at the top)
    layout.tsx            ← fonts, SEO metadata, analytics
    icon.svg              ← favicon
  components/             ← waitlist button, footer, logo, icons
  lib/site.ts             ← brand text + links
```

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy (Vercel, free tier is fine)

1. At [vercel.com](https://vercel.com) → **Add New → Project** → import this GitHub repo. It detects Next.js automatically.
2. Deploy. No environment variables are required; links have defaults in `src/lib/site.ts`.
3. **Custom domain + HTTPS:** Project → **Settings → Domains** → add `nexember.org` and `www.nexember.org`. Vercel shows the DNS records to add at the domain registrar. HTTPS certificates are issued automatically.
4. **Analytics:** Project → **Analytics** tab → Enable. This counts page views without cookies.
   Click events (`waitlist_click_*`, `whatsapp_click_*`, `contact_click`) are already sent from the code. Viewing custom events in the dashboard needs Vercel's Pro plan.

## Waitlist (Tally)

Signups live in Tally. To view or export them: Tally → the form → **Submissions** → Download CSV, or connect it to Google Sheets via **Integrations**.

**Source tracking:** the Join the Waitlist buttons pass any `utm_source`, `utm_medium` and `utm_campaign` from the page URL on to the Tally form. To save them with each signup, add three **Hidden fields** in the Tally form named exactly `utm_source`, `utm_medium` and `utm_campaign`. Then share links like:

```text
https://www.nexember.org/?utm_source=instagram&utm_medium=bio&utm_campaign=launch
https://www.nexember.org/?utm_source=whatsapp&utm_medium=channel&utm_campaign=launch
```

## Changing things

| What | Where |
| --- | --- |
| Waitlist link, WhatsApp link, contact email, social links | `src/lib/site.ts`, or override with environment variables (see `.env.example`). Empty social links are hidden. |
| Page copy | `src/app/page.tsx` |
| Colours | Top of `src/app/globals.css` |
| Privacy policy | `src/app/privacy/page.tsx` |
