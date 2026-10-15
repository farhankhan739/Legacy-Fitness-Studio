# Legacy Fitness Studio website

Static site: HTML + CSS + vanilla JavaScript. No build step, no dependencies, no backend.

## Structure
| File | Purpose |
|---|---|
| `index.html` | All content, contact details, SEO tags and JSON-LD |
| `css/style.css` | Design tokens (`:root` variables), components, reduced-motion rules |
| `css/responsive.css` | Breakpoints (1000 / 960 / 540 / 360 px) |
| `js/animations.js` | Scroll-reveal (loaded in `<head>`, respects reduced motion) |
| `js/script.js` | Mobile menu, photo viewer, appointment form -> WhatsApp |
| `assets/images/` | Logo, hero, gallery photos, `og-image.jpg` (social share image) |
| `_headers` | Netlify security headers + CSP |
| `robots.txt`, `sitemap.xml` | Search engine files (placeholder domain) |
| `docs/deployment.md` | Netlify, Search Console, security notes |

## Run locally (VS Code)
1. Open the `gym-website` folder in VS Code.
2. Install the **Live Server** extension, right-click `index.html` -> **Open with Live Server**.
   (Or run `python3 -m http.server 8000` in the folder and open http://localhost:8000.)

## Things to edit
- **Domain:** replace `YOUR-DOMAIN.com` in `index.html` (canonical, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml`.
- **Phone / WhatsApp:** search `919673289555` in `index.html` (contact cards, floating button, `data-whatsapp` on the form, JSON-LD).
- **Email:** search `abc@gmail.com` in `index.html`. It looks like a placeholder, so confirm or replace it.
- **Colors, radii, spacing:** variables at the top of `css/style.css`.

## Testing checklist
- [ ] Open at 320, 390, 768, 1024, 1440 px: no sideways scrolling.
- [ ] Mobile menu opens/closes (button, link tap, Esc, tap outside).
- [ ] All buttons are pill-shaped, show hover/focus states; Tab key reaches everything.
- [ ] Gallery photos open in the viewer and close with the X, Esc, or backdrop.
- [ ] Form: empty/invalid input shows errors; valid input opens WhatsApp with the message.
- [ ] Call, WhatsApp, Email, Directions and Instagram links go to the right place.
- [ ] Console has no errors; turn on "reduce motion" in the OS and confirm no animation.
- [ ] After deploy: `curl -I` shows the headers; `/robots.txt` and `/sitemap.xml` load.
- [ ] Google Rich Results Test accepts the structured data (after the domain is replaced).

## Handover report
**Implemented in the project:** separate files; pill-shaped buttons and consistent radii via CSS variables; dark text on orange buttons and a darker orange for small text (better contrast); no inline CSS/JS; contact details now written in the HTML (visible without JavaScript and to search engines); safe DOM handling (no `innerHTML`); `rel="noopener noreferrer"` on new-tab links; CSP and security headers file; SEO tags, JSON-LD, robots, sitemap, favicon, OG image; lazy-loaded below-the-fold images with width/height; reduced-motion support.

**Needs hosting setup:** `_headers` only works on Netlify (other hosts need their own config); HTTPS/HSTS; custom domain; Search Console verification.

**Information still needed:** real domain; confirmed email (`abc@gmail.com` looks like a placeholder, so it is NOT in the structured data); Facebook link (none supplied); membership prices (none shown); whether the official name is "Legacy Fitness Studio" or "Legacy Performance Studio" (the logo says LPS and the Instagram handle says legacy_performance_studio).

**Known limitations:** the form does not store or email anything, it opens the visitor's WhatsApp, and a message is only delivered when they press send. There is no server, so there is no server-side validation or rate limiting to configure. Fonts load from Google Fonts (privacy/performance trade-off; self-host them to remove it). Photos are JPEG; converting to WebP would reduce size further. **Not yet tested in a real browser** - run the checklist above.
