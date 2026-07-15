/* =========================================================================
   RazorDove Games — release data (single source of truth)
   Every version, date, per-platform URL and file size lives here.
   A version bump is one edit; desktop, mobile and sub-pages all render
   from this object so they can never drift.
   ========================================================================= */

window.RELEASES = {
  mvp: {
    key: 'mvp',
    variant: 'gold',           // amber accent set (games)
    glow: 'amber',             // mobile double-tap glow
    ver: 'v0.8.1',
    date: 'Jun 2026',
    subpage: 'mvp.html',       // version line shows "· Additional Releases" link
    builds: [
      { os: 'WIN x32', size: '217 MB', url: 'https://github.com/anthonydacunto/mvp-gamedemo/releases/download/v0.8.1/MVP-v0.8.1w32.zip' },
      { os: 'MAC',     size: '273 MB', url: 'https://github.com/anthonydacunto/mvp-gamedemo/releases/download/v0.8.1/MVP-v0.8.1m.zip' },
      { os: 'LINUX',   size: '209 MB', url: 'https://github.com/anthonydacunto/mvp-gamedemo/releases/download/v0.8.1/MVP-v0.8.1l.zip' },
    ],
  },
  bg: {
    key: 'bg',
    variant: 'red',            // red accent set (demos)
    glow: 'red',
    ver: 'v0.5',
    date: 'Jul 2026',
    subpage: 'buttongame.html', // version line shows "· Additional Releases" link
    builds: [
      { os: 'WIN x32', size: '63 MB',  url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.5/ButtonGame_Rollback-v0.5w32.zip' },
      { os: 'MAC',     size: '123 MB', url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.5/ButtonGame_Rollback-v0.5m.zip' },
      { os: 'LINUX',   size: '57 MB',  url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.5/ButtonGame_Rollback-v0.5l.zip' },
    ],
  },
  te: {
    key: 'te',
    variant: 'red',
    glow: 'red',
    ver: 'v1.0',
    date: 'Mar 2026',
    standalone: true,          // no sub-page; version line shows "· Standalone Release"
    builds: [
      { os: 'WIN x64', size: '', url: 'https://github.com/anthonydacunto/gobsmack-tool-demos/releases/download/te-v1.0/TransformEffects.Demonstration.zip' },
    ],
  },
};

/* =========================================================================
   Dev-log entries — newest first (top of /devlog).
   featured: true marks the entry the homepage teaser shows (not always [0]).
   tags: array shown as pill(s) in the meta line.
   title/excerpt inline links: class="link-demo" (red, demo pages) / class="link-game"
   (amber, game pages) / plain <a> for anything else (defaults to blue).
   media: null, { kind: 'image', src, alt }, or { kind: 'video', src } (YouTube URL).
   ========================================================================= */
window.DEVLOG = [
  {
    date: 'JUN 2026',
    tags: ['LATEST'],
    title: 'Revealing Ongoing <a href="buttongame.html" class="link-demo">Rollback</a> Development',
    excerpt: 'As of v0.4, <a href="buttongame.html" class="link-demo">ButtonGame Rollback</a> will now be getting public releases. This simple game demonstrates the ongoing development of our rollback net code algorithm, later to be migrated into other projects. Although currently limited to pier-to-pier connections - server binaries, lobby system, and spectation are just a few of the planned features. Stay tuned.',
    media: { kind: 'image', src: 'assets/buttongame-slime.png', alt: 'ButtonGame Rollback', scale: 4 },
  },
  {
    date: 'JUN 2026',
    tags: ['FEATURED', 'TEASER'],
    featured: true,
    title: '<a href="mvp.html" class="link-game">MVP</a> Announcement and Gameplay Snippets',
    excerpt: 'After 9 months of development we are happy to present the <a href="mvp.html" class="link-game">MVP 3D Fighter Demonstration</a>. Offering 20+ moves, button configuration, air-combos, programmable training dummy and more!<br><br>Following the <a href="mvp.html" class="link-game">v0.8.0 release</a>, our focus has shifted away from the <a href="mvp.html" class="link-game">MVP project</a> and geared towards new exciting features along with demonstrations.<br><br>Expect more from us soon,<br>RazorDove.',
    media: { kind: 'video', src: 'https://www.youtube.com/watch?v=6Gte9N5sFec&list=PLcmO2EN5VwhJoj00YvB23hWfVG-7ml3pE&index=2' },
  },
];
