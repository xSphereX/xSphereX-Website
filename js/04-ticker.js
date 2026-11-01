/* xSphereX / sphere. — ticker
   Duplicates the track once so the marquee loops without a gap. */

var ticker = document.getElementById('ticker');
if (ticker) ticker.innerHTML += ticker.innerHTML;
