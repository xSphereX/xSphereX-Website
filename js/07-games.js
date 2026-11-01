/* xSphereX / sphere. — game filters
   Filters the favourite-games grid by the tags on each card. */

var fbtns = document.querySelectorAll('.fbtn');
var gameCards = document.querySelectorAll('#gamesGrid .game');
fbtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var f = btn.getAttribute('data-filter');
    fbtns.forEach(function (b) { b.classList.toggle('on', b === btn); });
    gameCards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(',');
      var show = f === 'all' || tags.indexOf(f) !== -1;
      card.classList.toggle('is-hidden', !show);
    });
  });
});
