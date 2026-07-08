/* =========================================================================
   RazorDove Games — shared site behavior (vanilla JS, no framework)
   - renders download pills / rows / version labels from window.RELEASES
   - dynamic time-of-day greeting
   - desktop scroll-sheen (frame gradient sweep + proximity glow + opacity)
   - mobile drawer, expandable cards, copy-link, double-tap download
   - sub-page "minor changes" toggle
   Ported from the Claude-design reference; the reference runtime is NOT used.
   ========================================================================= */
(function () {
  'use strict';
  var R = window.RELEASES || {};
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function verDate(rel) { return rel.date ? (rel.ver + ' · ' + rel.date) : rel.ver; }

  /* ---- desktop download pill ------------------------------------------- */
  function pill(build, variant) {
    var a = el('a', 'dl-win ' + (variant === 'red' ? 'dl-win-red' : 'dl-win-gold'));
    a.href = build.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML =
      '<span class="os">' + build.os.replace(' ', '&nbsp;') + '</span>' +
      (build.size ? '<span class="sz">' + build.size + '</span>' : '') +
      '<span class="lbl">Download →</span>';
    return a;
  }

  /* ---- mobile download row (copy link + double-tap download) ----------- */
  function mobileRow(build, rel) {
    var row = el('div', 'm-row ' + (rel.variant === 'red' ? 'demo' : 'gold'));

    var os = el('span', 'm-os', build.os.replace(' ', '&nbsp;'));

    var copy = el('div', 'm-copy');
    copy.setAttribute('role', 'button');
    copy.setAttribute('data-copy', build.url);
    copy.innerHTML = '<span data-copy-label>Copy link</span>';

    var dl = el('a', 'm-dl');
    dl.href = build.url;
    dl.target = '_blank';
    dl.rel = 'noopener noreferrer';
    dl.setAttribute('data-dl-url', build.url);
    if (rel.glow === 'red') dl.setAttribute('data-dl-glow', 'red');
    dl.textContent = 'Download ↓';

    row.appendChild(os);
    row.appendChild(copy);
    row.appendChild(dl);
    return row;
  }

  /* ---- populate everything data-driven --------------------------------- */
  function render() {
    // desktop pill rows:  <div class="pillrow" data-pills="mvp"></div>
    document.querySelectorAll('[data-pills]').forEach(function (host) {
      var rel = R[host.getAttribute('data-pills')];
      if (!rel) return;
      host.innerHTML = '';
      rel.builds.forEach(function (b) { host.appendChild(pill(b, rel.variant)); });
    });

    // mobile rows:  <div data-rows="mvp"></div>
    document.querySelectorAll('[data-rows]').forEach(function (host) {
      var rel = R[host.getAttribute('data-rows')];
      if (!rel) return;
      // keep any leading notice child; append rows after it
      rel.builds.forEach(function (b) { host.appendChild(mobileRow(b, rel)); });
    });

    // version-date lines:  <div class="verline" data-verdate="te"></div>
    document.querySelectorAll('[data-verdate]').forEach(function (host) {
      var rel = R[host.getAttribute('data-verdate')];
      if (!rel) return;
      host.innerHTML = verDate(rel) +
        (rel.standalone ? ' <span class="standalone">· Standalone Release</span>' : '');
    });

    // mobile eyebrows:  <div data-eyebrow="mvp" data-eyebrow-prefix="GAME"></div>
    document.querySelectorAll('[data-eyebrow]').forEach(function (host) {
      var rel = R[host.getAttribute('data-eyebrow')];
      if (!rel) return;
      var prefix = host.getAttribute('data-eyebrow-prefix') || '';
      host.textContent = (prefix ? prefix + ' · ' : '') + verDate(rel);
    });
  }

  /* ---- dynamic greeting ------------------------------------------------- */
  function greeting() {
    var hosts = document.querySelectorAll('[data-greeting]');
    if (!hosts.length) return;
    var h = new Date().getHours();
    var text = (h >= 5 && h < 12) ? 'Good Morning.'
      : (h >= 12 && h < 16) ? 'Good Afternoon.'
      : 'Good Evening.';
    hosts.forEach(function (host) { host.textContent = text; });
  }

  /* ---- desktop scroll sheen -------------------------------------------- */
  function updateFX() {
    var vh = window.innerHeight, center = vh / 2;
    document.querySelectorAll('[data-rd-card]').forEach(function (card) {
      var rect = card.getBoundingClientRect();
      var cc = rect.top + rect.height / 2;
      var dist = Math.abs(center - cc);
      var c = Math.max(0, 1 - dist / (vh * 0.62));
      card.style.opacity = (0.6 + 0.4 * c).toFixed(3);
      if (reduceMotion) return; // keep opacity easing, skip the moving gradient
      var demo = card.getAttribute('data-rd-card') === 'demo';
      var rgb = demo ? '192,50,44' : '207,138,60';
      var frame = card.querySelector('[data-rd-frame]');
      if (!frame) return;
      var bright = demo ? '#c0322c' : '#cf8a3c';
      var muted = demo ? '#3a1d20' : '#3a2c1c';
      var skew = 118;
      var phase = (rect.top + rect.height / 2 - center) / vh;
      var pos = 50 - phase * 110;
      var core = 8, flat = 20, feather = 13;
      var p = function (x) { return x.toFixed(1); };
      frame.style.background =
        'linear-gradient(' + skew + 'deg, ' + bright + ' 0%, ' +
        bright + ' ' + p(pos - flat - feather) + '%, ' + muted + ' ' + p(pos - flat) + '%, ' +
        '#000 ' + p(pos - core) + '%, #000 ' + p(pos + core) + '%, ' +
        muted + ' ' + p(pos + flat) + '%, ' + bright + ' ' + p(pos + flat + feather) + '%, ' + bright + ' 100%)';
      var glowEl = card.querySelector('[data-rd-glow]');
      if (glowEl) {
        var gA = (0.55 * c * c).toFixed(3);
        var mA = (0.22 * c * c).toFixed(3);
        glowEl.style.background =
          'linear-gradient(' + skew + 'deg, rgba(' + rgb + ',' + gA + ') 0%, ' +
          'rgba(' + rgb + ',' + gA + ') ' + p(pos - flat - feather) + '%, rgba(' + rgb + ',' + mA + ') ' + p(pos - flat) + '%, ' +
          'rgba(' + rgb + ',0) ' + p(pos - core) + '%, rgba(' + rgb + ',0) ' + p(pos + core) + '%, ' +
          'rgba(' + rgb + ',' + mA + ') ' + p(pos + flat) + '%, rgba(' + rgb + ',' + gA + ') ' + p(pos + flat + feather) + '%, rgba(' + rgb + ',' + gA + ') 100%)';
        glowEl.style.opacity = '1';
      }
    });
  }

  /* ---- mobile drawer ---------------------------------------------------- */
  function initDrawer() {
    var open = document.querySelector('[data-menu-open]');
    if (open) open.addEventListener('click', function () { document.body.classList.add('menu-open'); });
    document.querySelectorAll('[data-menu-close]').forEach(function (n) {
      n.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  /* ---- mobile expandable cards (single open) --------------------------- */
  function initCards() {
    document.querySelectorAll('[data-toggle-card]').forEach(function (head) {
      head.addEventListener('click', function () {
        var card = head.closest('.m-card');
        var wasOpen = card.classList.contains('is-open');
        document.querySelectorAll('.m-card.is-open').forEach(function (c) { c.classList.remove('is-open'); });
        if (!wasOpen) card.classList.add('is-open');
      });
    });
  }

  /* ---- mobile "Copy link" ---------------------------------------------- */
  function initCopy() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (!t) return;
      e.preventDefault();
      var url = t.getAttribute('data-copy');
      try { if (navigator.clipboard) navigator.clipboard.writeText(url); } catch (_) {}
      var lbl = t.querySelector('[data-copy-label]') || t;
      if (!lbl.getAttribute('data-orig')) lbl.setAttribute('data-orig', lbl.textContent);
      lbl.textContent = 'Copied ✓';
      clearTimeout(t._ct);
      t._ct = setTimeout(function () {
        lbl.textContent = lbl.getAttribute('data-orig') || 'Copy link';
      }, 1500);
    }, true);
  }

  /* ---- mobile "Download" — double-tap to confirm ----------------------- */
  var REST_BORDER = 'rgba(236,233,228,0.18)', REST_COLOR = '#bdb9b2';
  var GLOW = {
    amber: { lit: '0 0 0 1px rgba(240,168,48,0.95), 0 0 11px rgba(240,168,48,0.55), 0 0 30px -2px rgba(214,52,40,0.9)', off: '0 0 0 1px rgba(240,168,48,0), 0 0 11px rgba(240,168,48,0), 0 0 30px -2px rgba(214,52,40,0)', border: 'rgba(240,168,48,0.95)' },
    red:   { lit: '0 0 0 1px rgba(214,52,40,0.95), 0 0 11px rgba(214,52,40,0.55), 0 0 30px -2px rgba(192,50,44,0.9)', off: '0 0 0 1px rgba(214,52,40,0), 0 0 11px rgba(214,52,40,0), 0 0 30px -2px rgba(192,50,44,0)', border: 'rgba(214,52,40,0.95)' },
  };
  var dlArmed = null, dlGlowEl = null, dlTapTimer = null, dlGlowTimer = null, live = null;

  function clearGlow() {
    if (dlGlowTimer) { clearTimeout(dlGlowTimer); dlGlowTimer = null; }
    // Set resting values EXPLICITLY (not '') so the anchor doesn't fall back to a{color:amber}.
    if (dlGlowEl) {
      var el2 = dlGlowEl;
      el2.style.transition = 'none';
      el2.style.boxShadow = 'none';
      el2.style.borderColor = REST_BORDER;
      el2.style.color = REST_COLOR;
      dlGlowEl = null;
    }
  }
  function disarm() { if (dlTapTimer) { clearTimeout(dlTapTimer); dlTapTimer = null; } dlArmed = null; }

  function initDownload() {
    // aria-live cue (an accessibility improvement over the reference)
    live = el('div');
    live.setAttribute('aria-live', 'polite');
    live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);';
    document.body.appendChild(live);

    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-dl-url]') : null;
      if (!t) return;
      if (dlArmed === t) {                 // confirmed: let the native anchor download
        disarm(); clearGlow();
        if (live) live.textContent = '';
        return;
      }
      e.preventDefault();                  // first tap: arm + glow
      disarm(); clearGlow();
      dlArmed = t; dlGlowEl = t;
      var g = GLOW[t.getAttribute('data-dl-glow') === 'red' ? 'red' : 'amber'];
      t.style.transition = 'none';
      t.style.boxShadow = g.lit; t.style.borderColor = g.border; t.style.color = '#fff';
      void t.offsetWidth;
      t.style.transition = 'box-shadow 330ms linear, border-color 330ms linear, color 330ms linear';
      t.style.boxShadow = g.off; t.style.borderColor = REST_BORDER; t.style.color = REST_COLOR;
      if (live) live.textContent = 'Tap again to confirm download';
      dlTapTimer = setTimeout(function () { dlArmed = null; dlTapTimer = null; }, 250);
      dlGlowTimer = setTimeout(clearGlow, 350);
    }, true);
  }

  /* ---- mobile Technical-Artist chip: wandering hue drift --------------- */
  function initRainbowChip() {
    var node = document.getElementById('ta-rainbow');
    if (!node || reduceMotion) return;
    var hue = 0, vel = 72, target = 72, retargetIn = 0, last = performance.now();
    function tick(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      retargetIn -= dt;
      if (retargetIn <= 0) {
        var mag = 30 + Math.random() * 530;
        target = (Math.random() < 0.5 ? -1 : 1) * mag;
        retargetIn = 0.25 + Math.random() * 1.0;
      }
      vel += (target - vel) * Math.min(1, dt * 6);
      hue = (hue + vel * dt + 360) % 360;
      node.style.filter = 'hue-rotate(' + hue + 'deg)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- sub-page "minor changes" toggle --------------------------------- */
  function initMinorToggle() {
    document.querySelectorAll('[data-minor-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.minor').classList.toggle('is-open');
      });
    });
  }

  /* ---- back to top ------------------------------------------------------ */
  function initTop() {
    document.querySelectorAll('[data-top]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---- boot ------------------------------------------------------------- */
  function boot() {
    render();
    greeting();
    initDrawer();
    initCards();
    initCopy();
    initDownload();
    initRainbowChip();
    initMinorToggle();
    initTop();

    updateFX();
    window.addEventListener('scroll', updateFX, { passive: true });
    window.addEventListener('resize', updateFX);
    // warm-up ticks so late-loading fonts/art don't leave stale geometry
    var n = 0, warm = setInterval(function () { updateFX(); if (++n > 20) clearInterval(warm); }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
