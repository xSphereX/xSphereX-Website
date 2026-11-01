/* xSphereX / sphere. — image fallbacks
   Every <img> gets a fallback chain via data-fallback, then a graceful
   failure state. Art also fades in once it decodes. */

document.querySelectorAll('img').forEach(function (img) {
  function markFailed() {
    img.style.display = 'none';
    var host = img.closest('[data-img-host], .game-cover, .artist-photo');
    if (host) host.classList.add('img-failed');
  }

  img.addEventListener('error', function handler() {
    var next = img.getAttribute('data-fallback');
    if (next) {
      img.removeAttribute('data-fallback');
      img.src = next;
      return;
    }
    img.removeEventListener('error', handler);
    markFailed();
  });

  /* fade real photos/art in once they decode */
  if (img.classList.contains('cover-img') || img.classList.contains('art') || img.closest('.artist-photo')) {
    if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
    else img.addEventListener('load', function () { img.classList.add('loaded'); });
  }
});
