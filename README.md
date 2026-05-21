# Mahmoud Shaabo — Personal Portfolio

> **Live sites:**
> - 🌐 GitHub Pages: [mahmoudshaabo1984.github.io](https://mahmoudshaabo1984.github.io/)
> - 🚀 Netlify: [mahmoudshaabo-portfolio.netlify.app](https://mahmoudshaabo-portfolio.netlify.app/)

---

## About

Personal portfolio website for **Mahmoud Shaabo**, a software engineer trainee at [CodeYourFuture (CYF)](https://codeyourfuture.io/) — Sheffield 2026 cohort.

Built from scratch with plain HTML, CSS, and JavaScript — no frameworks, no build steps required. The site was designed with a strong focus on **web accessibility (WCAG)** and full **NVDA screen-reader compatibility**, reflecting the author's own experience as a visually impaired developer.

---

## Features

| Feature | Details |
|---|---|
| 🌙 Dark / Light theme | Toggle with `localStorage` persistence, `prefers-color-scheme` detection, and `color-scheme` sync |
| 🌍 Bilingual EN / AR | Full EN↔AR toggle with RTL layout flip and per-language font stacks (Outfit / Cairo) |
| ♿ Accessibility | Skip link, ARIA live region, `aria-current` scroll-spy, `prefers-reduced-motion`, forced-colors support |
| 📱 Responsive | Mobile-first, off-canvas hamburger menu, three breakpoints (480 / 768 / 992 px) |
| 🔍 Project filtering | Tag-chip filter (All / Python / JavaScript / HTML / C#) with live-region count announcements |
| 📬 Contact form | Netlify Forms with honeypot, client-side validation, accessible error messages |
| 🎞 Scroll animations | IntersectionObserver reveal (disabled when `prefers-reduced-motion: reduce`) |
| ⬆ Back to top | Appears after 400 px scroll, smooth-scrolls and focuses `#top` |
| 🔎 SEO | Open Graph, Twitter Card, JSON-LD Person schema, canonical, sitemap, robots.txt |
| 🖼 PWA-ready | `site.webmanifest`, multi-size icons (16→512 px), `apple-touch-icon` |
| 🔒 Security headers | CSP, HSTS, X-Frame, Permissions-Policy via `netlify.toml` |
| 🖨 Print styles | Resume-style print layout |

---

## Project Structure

```
.
├── index.html            # Main page (all sections)
├── 404.html              # Custom not-found page
├── style.css             # All styles (dark/light/RTL/print)
├── script.js             # All behaviour (theme, i18n, menu, filter, form …)
├── profile.jpg           # Hero profile photo
├── favicon.svg           # Scalable "MS" monogram icon
├── favicon.ico           # Multi-size fallback (16/32/48 px)
├── apple-touch-icon.png  # iOS home-screen icon (180 px)
├── icon-192.png          # PWA icon
├── icon-512.png          # PWA maskable icon
├── og-image.png          # Social share preview (1200×630)
├── og-image.svg          # Source SVG for OG image
├── apple-touch-icon.svg  # Source SVG for touch icon
├── site.webmanifest      # PWA manifest
├── robots.txt            # Search-engine directives
├── sitemap.xml           # Sitemap with hreflang (EN/AR)
├── netlify.toml          # Netlify headers, cache rules, redirects
├── build-assets.mjs      # Asset build script (sharp) — dev only
└── package.json          # Dev dependencies (sharp)
```

---

## Tech Stack

- **HTML5** — semantic, WCAG-compliant markup
- **CSS3** — custom properties, Grid, Flexbox, container queries, `@media (forced-colors)`
- **Vanilla JavaScript (ES2020)** — no frameworks, no bundler
- **Netlify** — hosting, Forms, security headers
- **GitHub Pages** — secondary hosting via `github.io` subdomain
- **Google Fonts** — Outfit (EN) + Cairo (AR)

---

## Accessibility

This site was built by and for a screen-reader user. Every interactive element has been verified with **NVDA on Windows 11**:

- All announcements go through `#a11y-alert-region` (`aria-live="polite"`)
- Theme and language changes are announced in the active language (EN/AR)
- Mobile menu uses `aria-expanded` + focus management + Escape-to-close
- Windows High Contrast (`forced-colors: active`) is detected and handled with a banner and system-color fallbacks
- Zero keyboard traps; full Tab/Shift+Tab navigability

---

## Local Development

No build step required for the site itself — open `index.html` directly in any browser.

To regenerate binary icon assets after editing the SVG sources:

```bash
npm install
npm run build:assets
```

This runs `build-assets.mjs` which uses [sharp](https://sharp.pixelplumbing.com/) to produce PNG and ICO files from SVG sources.

---

## Deployment

### GitHub Pages
Pushes to `main` deploy automatically via the `github.io` repo convention.

### Netlify
```bash
npx netlify-cli deploy --prod --dir=.
```
The site is linked to Netlify site ID `6833352d-c4d9-41d6-80a3-ca96584e3499`.

---

## Author

**Mahmoud Shaabo**
- GitHub: [@mahmoudshaabo1984](https://github.com/mahmoudshaabo1984)
- Portfolio: [mahmoudshaabo-portfolio.netlify.app](https://mahmoudshaabo-portfolio.netlify.app/)

---

## License

© 2026 Mahmoud Shaabo. All rights reserved.
