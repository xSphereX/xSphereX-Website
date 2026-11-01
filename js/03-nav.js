/* xSphereX / sphere. — navigation
   Mobile menu toggle, plus a dot on the nav link for the section in view. */

var burger = document.getElementById('burger');
var navList = document.getElementById('navList');
var burgerIcon = burger.querySelector('i');

function setMenu(open) {
  navList.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  burgerIcon.classList.toggle('fa-bars', !open);
  burgerIcon.classList.toggle('fa-xmark', open);
}
burger.addEventListener('click', function () {
  setMenu(!navList.classList.contains('open'));
});
navList.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { setMenu(false); });
});
document.addEventListener('click', function (e) {
  if (navList.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && navList.classList.contains('open')) setMenu(false);
});

var navLinks = document.querySelectorAll('[data-nav]');
var sections = [];
navLinks.forEach(function (a) {
  var sec = document.getElementById(a.getAttribute('data-nav'));
  if (sec) sections.push({ id: sec.id, el: sec, link: a });
});
if ('IntersectionObserver' in window && sections.length) {
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('data-nav') === en.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { so.observe(s.el); });
}
