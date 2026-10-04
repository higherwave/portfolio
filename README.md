# David Garrett — Portfolio

Static site. No build step.

## Structure
- `index.html` — Home (entry point)
- `Home.dc.html`, `AI-Operational-Intelligence.dc.html`, `Developer-Data-Platforms.dc.html`, `My-Approach.dc.html`, `CV.dc.html` — pages
- `SiteNav.dc.html`, `SiteFooter.dc.html` — shared header/footer, loaded by every page
- `support.js` — page runtime (loads React from unpkg)
- `image-slot.js`, `lightbox.js`, `band-motion.js` — image frames, zoom lightbox, color band motion
- `assets/` — portrait and all case study images (`assets/slots/<slot-id>.webp`)
- `.image-slots.state.json` — saved crop/position for each image (keep this file)

## Run locally
Pages fetch sibling files, so serve the folder rather than opening files directly:
```
npx serve .
```

## Deploy to Vercel
1. Push this folder to a GitHub repo (as the repo root, or set it as the Root Directory in Vercel).
2. Import the repo in Vercel. Framework preset: **Other**. No build command, no output directory.

## Updating images
Replace a file in `assets/slots/` keeping the same name, or point an `<image-slot>`'s `src` at a new file.
