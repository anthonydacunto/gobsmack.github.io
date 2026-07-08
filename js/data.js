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
    ver: 'v0.4',
    date: 'Jun 2026',
    builds: [
      { os: 'WIN x32', size: '65 MB',   url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.4/ButtonGame_Rollback-v0.4w32.zip' },
      { os: 'MAC',     size: '119 MB',  url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.4/ButtonGame_Rollback-v0.4m.zip' },
      { os: 'LINUX',   size: '57.1 MB', url: 'https://github.com/anthonydacunto/buttongame_rollback/releases/download/v0.4/ButtonGame_Rollback-v0.4l.zip' },
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
