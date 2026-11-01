/* xSphereX / sphere. — 3D Minecraft skin viewer
   Renders the live skin with skinview3d. Every texture source is keyed by
   username and cache-busted, so a skin changed in-game shows up here.
   If the library, WebGL or every texture source fails, the canvas hides and
   the static render stays visible. */

(function initSkin() {
  'use strict';
  var stage = document.getElementById('skinStage');
  var canvas = document.getElementById('skinCanvas');
  var fallback = document.getElementById('skinFallback');
  var note = document.getElementById('skinNote');
  var animBtns = document.querySelectorAll('.anim-btn');
  var spinBtn = document.getElementById('spinBtn');
  var spinLabel = spinBtn.querySelector('span');

  var USER = 'xSphereXx';

  /* Resolved at runtime so the viewer always renders whatever skin the
     account currently wears — change it at minecraft.net and it shows up
     here on the next load. Each provider is keyed by username, so none of
     them can go stale the way a frozen UUID would. */
  function stamp() { return '?v=' + Date.now(); }
  function skinSources() {
    return [
      'https://vzge.me/skin/512/' + USER + '.png' + stamp(),
      'https://minotar.net/skin/' + USER + '?v=' + Date.now(),
      'https://mc-heads.net/skin/' + USER + '?v=' + Date.now()
    ];
  }

  function fail(msg) {
    canvas.style.display = 'none';
    note.textContent = msg || 'static preview';
    animBtns.forEach(function (b) { b.disabled = true; });
    spinBtn.disabled = true;
  }

  if (!window.skinview3d) { fail(); return; }

  var viewer;
  try {
    viewer = new window.skinview3d.SkinViewer({
      canvas: canvas,
      width: stage.clientWidth || 460,
      height: stage.clientHeight || 440,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2)
    });
  } catch (e) { fail(); return; }

  viewer.zoom = 0.82;
  viewer.fov = 44;
  viewer.autoRotate = !window.Sphere.reduced;
  viewer.autoRotateSpeed = 0.7;
  viewer.controls.enableZoom = false;
  viewer.controls.enablePan = false;
  canvas.style.touchAction = 'pan-y';

  if (window.Sphere.reduced) {
    spinBtn.classList.add('off');
    spinBtn.setAttribute('aria-pressed', 'false');
    spinLabel.textContent = 'spin';
  }

  var ANIM = {
    idle: function () { return new window.skinview3d.IdleAnimation(); },
    walk: function () { var a = new window.skinview3d.WalkingAnimation(); a.speed = 0.8; return a; },
    run:  function () { var a = new window.skinview3d.RunningAnimation(); a.speed = 0.9; return a; },
    wave: function () { return new window.skinview3d.WaveAnimation(); }
  };

  var userPicked = false;
  function setAnim(name) {
    if (!ANIM[name]) return;
    viewer.animation = ANIM[name]();
    animBtns.forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-anim') === name); });
  }
  animBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      userPicked = true;
      setAnim(b.getAttribute('data-anim'));
    });
  });

  spinBtn.addEventListener('click', function () {
    viewer.autoRotate = !viewer.autoRotate;
    spinBtn.setAttribute('aria-pressed', String(viewer.autoRotate));
    spinBtn.classList.toggle('off', !viewer.autoRotate);
    spinLabel.textContent = viewer.autoRotate ? 'pause spin' : 'spin';
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { viewer.renderPaused = !en.isIntersecting; });
    }, { threshold: 0.05 }).observe(stage);
  }

  if ('ResizeObserver' in window) {
    var raf = null;
    new ResizeObserver(function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        viewer.setSize(stage.clientWidth, stage.clientHeight);
      });
    }).observe(stage);
  }

  function ready() {
    fallback.classList.add('hidden');
    note.textContent = 'drag to rotate';
    if (!userPicked) {
      setAnim('wave');
      setTimeout(function () { if (!userPicked) setAnim('idle'); }, 2600);
    }
    viewer.loadCape('https://vzge.me/cape/512/' + USER + '.png').catch(function () {});
  }

  function trySource(i, list) {
    if (i >= list.length) { fail(); return; }
    viewer.loadSkin(list[i]).then(ready).catch(function () { trySource(i + 1, list); });
  }
  trySource(0, skinSources());

  /* manual refresh: pick up a skin changed in-game without reloading the page */
  var refreshBtn = document.getElementById('skinRefresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function () {
      refreshBtn.classList.add('spinning');
      note.textContent = 'refreshing…';
      fallback.classList.add('hidden');
      trySource(0, skinSources());
      setTimeout(function () { refreshBtn.classList.remove('spinning'); }, 900);
    });
  }
})();