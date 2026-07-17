# RazorDove Games — portfolio site

Plain static multi-page site (no build step, no dependencies). Rebuilt from the
July-2026 Claude-design handoffs (portfolio + dev-log). Deploys to GitHub Pages as-is.

## Structure

```
site/
├── index.html        Home  (dynamic greeting + featured M.V.P. card + dev-log teaser)
├── releases.html     Releases  (ButtonGame Rollback · M.V.P. · TransformEffects)
├── devlog.html       Dev-log  (full entry list, rendered from js/data.js)
├── about.html        About  (bio + animated role line)
├── mvp.html          M.V.P. build-history sub-page
├── buttongame.html   ButtonGame Rollback build-history sub-page
├── css/style.css     all styles (design tokens + components + responsive)
├── js/
│   ├── data.js       ← SINGLE SOURCE OF TRUTH for releases/versions/URLs + dev-log entries
│   └── site.js       renders pills + dev-log cards from data + all interactions
└── assets/           logos + splash art (PNG)
```

## Editing releases

Bump a version, size, or download URL in **one place** — `js/data.js`. Every
download pill and version label on Home, Releases, both sub-pages, and the mobile
layout re-renders from it, so they can't drift.

## Editing the dev-log

Entries live in `window.DEVLOG` (`js/data.js`), newest first. Each entry:
`{ date, tags, title, excerpt (HTML), media }` where `media` is `null`,
`{ kind: 'image', src, alt, scale? }`, or `{ kind: 'video', src }` (a YouTube URL).
`scale` (optional) upscales small pixel art N× with crisp edges; omit for
normal-size images, which render at natural size (capped to the media box).
Mark one entry `featured: true` — that one shows in the homepage teaser
(otherwise the first array item does). `devlog.html` renders the whole array.
Inline excerpt links: `class="link-demo"` (red) for demo pages,
`class="link-game"` (amber) for game pages, plain `<a>` (blue) for anything else.

## Layout

- One breakpoint at **860px** (CSS media query). The four main pages ship both a
  desktop and a mobile layout; the query shows one and hides the other.
- The two build-history sub-pages (`mvp.html`, `buttongame.html`) are
  **desktop-only**: a head script redirects mobile viewports (same breakpoint)
  to `releases.html`, whose mobile cards cover every build.
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
- **Dev-log entry 1's image** reuses the ButtonGame slime sprite
  (`assets/buttongame-slime.png`, 48×48, per spec), shown at `scale: 4` (192 px,
  pixelated) via `js/data.js`. Swap `media.src` for larger art if desired.
- Accessibility: mobile double-tap download now announces "Tap again to confirm"
  via an `aria-live` region, and animations respect `prefers-reduced-motion`.
- The reference runtime (`support.js`) was **not** ported, per the handoff.
