# Md. Habibullah Pappu — Portfolio

Personal portfolio website, hosted on GitHub Pages.

**Live site:** https://habibpappu.github.io/

## Overview

This is the production-ready static build of the portfolio (`index.html` +
bundled JS/CSS under `assets/`). It's a static export — no build step is
needed to deploy it, just push these files to the repository root.

## Project Structure

```
.
├─ index.html              # Entry point / app shell
├─ 404.html                # SPA-style redirect for unknown routes
├─ robots.txt
├─ sitemap.xml
├─ site.webmanifest
├─ .nojekyll                # Tells GitHub Pages to skip Jekyll processing
├─ portfolio-data.json      # Reference copy of the site content
├─ Md. Habibullah Pappu.pdf # Downloadable CV/resume
└─ assets/
   ├─ index-*.js            # Bundled app JS (filename hash may change on rebuild)
   ├─ index-*.css           # Bundled app CSS
   ├─ portfolio-theme.css
   ├─ site-interactions.js
   └─ profile-avatar.jpg
```

## Local Preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment (GitHub Pages, user site)

This repo is a **user/organization Pages site** (`habibpappu.github.io`), so
GitHub serves it automatically from the repo root — no custom domain or
`CNAME` file is required.

1. Push the contents of this folder to the root of the `habibpappu.github.io`
   repository, on the `main` branch.
2. In the repo, go to **Settings → Pages** and confirm the source is set to
   `main` / `root`.
3. `.nojekyll` must stay at the repo root — it prevents GitHub Pages from
   running its default Jekyll build, which can break the `assets/` folder.
4. The site will be live at https://habibpappu.github.io/ within a minute or two.

## Maintenance Notes

- `index.html` holds SEO/social metadata (title, description, Open Graph,
  Twitter card) and the app bootstrap tag — update these if your role or
  summary changes.
- If you rebuild the frontend from source, replace the files in `assets/`
  and update the `<script>`/`<link>` references in `index.html` if the
  hashed filenames change.
- `portfolio-data.json` is a reference copy of your content, not something
  the live app currently fetches at runtime.
- Keep `sitemap.xml`, `robots.txt`, and `site.webmanifest` aligned with the
  canonical domain if that ever changes.

## License

All rights reserved unless stated otherwise.
