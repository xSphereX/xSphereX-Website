/* xSphereX / sphere. — Discord avatar
   Discord invalidates old CDN hashes, so the avatar is resolved at runtime
   from a public lookup API, probed before use, and only then committed. */

(function avatar() {
  var stack  = document.getElementById('avatarStack');
  var img    = document.getElementById('avatarImg');
  var deco   = document.getElementById('avatarDeco');
  var USER_ID = '735936207162310716';

  if (!stack || !img) return;

  function applyDeco(url) {
    if (!deco || !url) return;
    deco.src = url;
  }

  function enableDecoLayout(ok) {
    stack.classList.toggle('has-deco', !!ok);
  }

  /* decoration preset: show the bigger ring only when it really loaded */
  if (deco) {
    deco.addEventListener('load', function () {
      enableDecoLayout(deco.naturalWidth > 0);
    });
    deco.addEventListener('error', function () {
      enableDecoLayout(false);
      deco.remove();
    });
    if (deco.complete) enableDecoLayout(deco.naturalWidth > 0);
  }

  /* treat a 404 image as failed even when no error event fires */
  function whenUsable(el, cb) {
    var done = false;
    function fin(ok) { if (!done) { done = true; cb(ok); } }
    el.addEventListener('load',  function () { fin(el.naturalWidth > 0); });
    el.addEventListener('error', function () { fin(false); });
    if (el.complete) fin(el.naturalWidth > 0);
    setTimeout(function () { fin(el.naturalWidth > 0); }, 6000);
  }

  var LOOKUPS = [
    'https://japi.rest/discord/v1/user/' + USER_ID,
    'https://discordlookup.mesalytic.com/v1/users/' + USER_ID
  ];

  function fromPayload(data) {
    if (!data) return null;
    var d = data.data && data.data.id ? data.data : data;   /* japi nests under .data */
    var av = d.avatar;
    if (!av) return null;
    var ext = av.indexOf('a_') === 0 ? 'gif' : 'png';
    var out = {
      avatar: 'https://cdn.discordapp.com/avatars/' + USER_ID + '/' + av + '.' + ext + '?size=256',
      deco: null
    };
    var dec = d.avatar_decoration_data || d.avatar_decoration;
    if (dec && dec.asset) {
      out.deco = 'https://cdn.discordapp.com/avatar-decoration-presets/' + dec.asset + '.png?size=256';
    }
    return out;
  }

  function tryLookup(i) {
    if (i >= LOOKUPS.length) return;                    /* keep the baked-in fallback */
    fetch(LOOKUPS[i], { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (json) {
        var found = fromPayload(json);
        if (!found) { tryLookup(i + 1); return; }
        /* only commit once the new avatar actually loads */
        var probe = new Image();
        probe.onload = function () {
          img.src = found.avatar;
          img.removeAttribute('data-fallback');
          stack.classList.remove('img-failed');
          if (found.deco) { deco.style.display = ''; applyDeco(found.deco); }
        };
        probe.onerror = function () { tryLookup(i + 1); };
        probe.src = found.avatar;
      })
      .catch(function () { tryLookup(i + 1); });
  }

  /* the baked-in URL is a last-known-good; if it already fails, try the head */
  whenUsable(img, function (ok) {
    if (ok) { tryLookup(0); return; }
    img.src = 'https://minotar.net/helm/xSphereXx/256.png';
    whenUsable(img, function (ok2) {
      if (!ok2) stack.classList.add('img-failed');
    });
  });
})();
