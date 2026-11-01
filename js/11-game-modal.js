/* xSphereX / sphere. — game detail modal
   Cards carry their details in data-* attributes; this shows them in a
   dialog. Handles keyboard access, focus handling and Escape. */

(function () {
  'use strict';

  var modal = document.getElementById('gameModal');
  if (!modal) return;

  var card    = modal.querySelector('.modal-card');
  var art     = document.getElementById('gmArt');
  var elYear  = document.getElementById('gmYear');
  var elGenre = document.getElementById('gmGenre');
  var elTitle = document.getElementById('gmTitle');
  var elAbout = document.getElementById('gmAbout');
  var elMaker = document.getElementById('gmMaker');
  var elPlat  = document.getElementById('gmPlatforms');
  var elRel   = document.getElementById('gmReleased');
  var elLink  = document.getElementById('gmLink');

  var lastFocused = null;
  var FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function open(game) {
    var img  = game.querySelector('.cover-img');
    var name = game.querySelector('.game-title');
    var genre = game.querySelector('.game-genre');
    var tags = Array.prototype.map.call(
      game.querySelectorAll('.game-tags span'),
      function (t) { return t.textContent.trim(); }
    );

    /* full-size art: the same file the card uses, not a cropped thumbnail */
    if (img) {
      art.src = img.currentSrc || img.src;
      art.alt = (name ? name.textContent : 'Cover') + ' art';
    }

    elYear.textContent  = game.getAttribute('data-year') || '';
    elGenre.textContent = genre ? genre.textContent.trim() : tags.join(' · ');
    elTitle.textContent = name ? name.textContent.trim() : '';
    elAbout.textContent = game.getAttribute('data-about') || '';
    elMaker.textContent = game.getAttribute('data-maker') || '';
    elPlat.textContent  = game.getAttribute('data-platforms') || '';
    elRel.textContent   = game.getAttribute('data-released') || '';

    var link = game.getAttribute('data-link');
    if (link) {
      elLink.href = link;
      elLink.style.display = '';
    } else {
      elLink.style.display = 'none';
    }

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    /* focus the close button so keyboard users land inside the dialog */
    var first = modal.querySelector('.modal-x');
    if (first) first.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ── open from a card: click or Enter/Space ── */
  function bind(game) {
    game.addEventListener('click', function (e) {
      /* let real links inside a card behave normally */
      if (e.target.closest('a')) return;
      open(game);
    });
    game.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        open(game);
      }
    });
  }

  var games = document.querySelectorAll('.games-grid .game');
  Array.prototype.forEach.call(games, bind);

  /* re-bind after filtering, in case cards are ever rebuilt */
  document.querySelectorAll('.fbtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('.games-grid .game'), function (g) {
        if (!g.dataset.bound) { bind(g); g.dataset.bound = '1'; }
      });
    });
  });
  Array.prototype.forEach.call(games, function (g) { g.dataset.bound = '1'; });

  /* ── close: backdrop, the X, or the close button ── */
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) close();
  });

  /* ── Escape closes, Tab is trapped inside ── */
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'Tab') {
      var items = card.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
})();
