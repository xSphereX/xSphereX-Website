/* xSphereX / sphere. — hero parallax
   Moves the soft glow behind the portrait with the pointer. */

(function () {
  'use strict';
  if (window.Sphere.reduced || !window.Sphere.finePointer) return;

  var hero = document.querySelector('.hero');
  var glow = document.querySelector('.portrait-glow');
  if (!hero || !glow) return;

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    glow.style.transform =
      'translate(calc(-50% + ' + (x * 26) + 'px), calc(-50% + ' + (y * 20) + 'px))';
  });

  hero.addEventListener('pointerleave', function () {
    glow.style.transform = '';
  });
})();
