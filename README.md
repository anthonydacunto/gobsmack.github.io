# RazorDove Games — portfolio site

Plain static multi-page site (no build step, no dependencies). Rebuilt from the
July-2026 Claude-design handoff. Deploys to GitHub Pages as-is.

## Structure

```
site/
├── index.html        Home  (dynamic greeting + featured M.V.P. card + dev-log)
├── releases.html     Releases  (ButtonGame Rollback · M.V.P. · TransformEffects)
├── about.html        About  (bio + animated role line)
├── mvp.html          M.V.P. build-history sub-page
├── buttongame.html   ButtonGame Rollback build-history sub-page
├── css/style.css     all styles (design tokens + components + responsive)
├── js/
│   ├── data.js       ← SINGLE SOURCE OF TRUTH for every release/version/URL/size
│   └── site.js       renders pills from data + all interactions
└── assets/           logos + splash art (PNG)
```

## Editing releases

Bump a version, size, or download URL in **one place** — `js/data.js`. Every
download pill and version label on Home, Releases, both sub-pages, and the mobile
layout re-renders from it, so they can't drift.

## Layout

- One breakpoint at **860px** (CSS media query). Each page ships both a desktop
  and a mobile layout; the query shows one and hides the other.
- Real URLs, real files — deep links and refresh work with no SPA/router hacks.

## Deploy (GitHub Pages)

The contents of this `site/` folder are the site root. Push them to the
`razordove` repo (root or `/docs`, per the repo's Pages setting). Because all
paths are **relative**, it works unchanged at both the current project URL
(`anthonydacunto.github.io/razordove/`) and a future root custom domain — the
"D" goal — with no edits.

## Notes / follow-ups

- **TransformEffects download** still points at the old `gobsmack-tool-demos`
  release (`js/data.js`). That repo wasn't renamed; update the URL there if/when
  it moves.
- **Dev-log** is an intentional empty-state placeholder — wire it to real posts later.
- Accessibility: mobile double-tap download now announces "Tap again to confirm"
  via an `aria-live` region, and animations respect `prefers-reduced-motion`.
- The reference runtime (`support.js`) was **not** ported, per the handoff.
