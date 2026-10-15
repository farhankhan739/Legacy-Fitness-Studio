# Deployment guide (Netlify)

## 1. Deploy
- **Easiest:** log in to Netlify -> *Add new site* -> *Deploy manually* -> drag the whole `gym-website` folder in.
- **Better long term:** push the folder to a private GitHub repo -> *Import from Git*. Leave build command empty, publish directory `.`.

## 2. Domain and HTTPS
Site settings -> Domain management -> add your domain and follow the DNS steps. Netlify issues the HTTPS certificate automatically; turn on *Force HTTPS*.
Then replace `YOUR-DOMAIN.com` everywhere (see README) and redeploy.

## 3. Verify security headers
Run `curl -I https://YOUR-DOMAIN.com` and check the headers from `_headers` appear, or use securityheaders.com.
Open the site with the browser console open: any CSP violations are logged there. If you add a new external script or image host, add it to the CSP in `_headers`.

## 4. SEO
- Google Search Console -> add property -> verify (DNS record is simplest) -> *Sitemaps* -> submit `sitemap.xml`.
- Test structured data at search.google.com/test/rich-results.
- A Google Business Profile for the gym helps local search; no ranking is guaranteed.
- **Analytics (optional):** not included. Adding Google Analytics means a third-party script (update the CSP), cookies/tracking and, depending on your audience, a privacy notice. Privacy-friendly alternatives exist.

## 5. Security notes
- There are no secrets in this project. Never add passwords, API keys or tokens to HTML/CSS/JS; anything in the browser is public.
- Turn on two-factor authentication for Netlify, GitHub and your domain registrar.
- Protections implemented here: CSP, nosniff, referrer policy, frame protection, permissions policy, HSTS (set by `_headers`/Netlify). Protections you configure at the host: HTTPS, DNS, account security.
- **If you later want to store enquiries** (instead of WhatsApp): use a form service (e.g. Netlify Forms) or a small serverless function with server-side validation, a honeypot field, rate limiting, and keys in Netlify environment variables (never in the code). Update `form-action`/`connect-src` in the CSP accordingly.
- Keep it simple: no dependencies means nothing to patch. Re-check Google Fonts and any future libraries periodically.
