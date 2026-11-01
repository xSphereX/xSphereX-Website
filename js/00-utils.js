/* xSphereX / sphere. — shared helpers
   Small helpers used by the other modules. Also sets the .js class so the
   reveal styles only apply when scripting is available. */

document.documentElement.classList.add('js');

window.Sphere = {
  reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: window.matchMedia('(pointer: fine)').matches,

  /* Fade an image in once it has actually decoded. */
  revealWhenLoaded: function (img) {
    if (img.complete && img.naturalWidth > 0) { img.classList.add('loaded'); return; }
    img.addEventListener('load', function () { img.classList.add('loaded'); });
  },

  /* Copy text, falling back to a hidden textarea on old/insecure contexts. */
  copy: function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.setAttribute('readonly', '');
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }
};
