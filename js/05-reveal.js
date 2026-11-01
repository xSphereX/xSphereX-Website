/* xSphereX / sphere. — scroll reveal
   Fades sections in as they enter the viewport, with a safety net so
   content can never stay hidden. */

var revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.Sphere.reduced) {
  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { ro.observe(el); });
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }, 3000);
} else {
  revealEls.forEach(function (el) { el.classList.add('in'); });
}
