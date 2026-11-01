/* xSphereX / sphere. — poem toggle
   Swaps the poem for its meaning, with a short crossfade. */

var poemSwitch = document.getElementById('poemSwitch');
var poemView = document.getElementById('poemView');
var poemCap = document.getElementById('poemCap');
var tryVal = document.getElementById('tryVal');
var poemHTML = poemView.innerHTML;
poemView.style.transition = 'opacity .3s ease';

var MEANING = '<p class="poem-meaning">Focus isn&rsquo;t about wanting less — it&rsquo;s about choosing <b>one thing</b> ' +
  'and giving it your whole attention. The melody didn&rsquo;t hand me an answer; it just made the choice ' +
  'feel possible. So: pick a star. Walk toward it.</p>';

poemSwitch.addEventListener('click', function () {
  var on = poemSwitch.getAttribute('aria-checked') === 'true';
  var next = !on;
  poemSwitch.setAttribute('aria-checked', String(next));

  poemView.style.opacity = '0';
  setTimeout(function () {
    poemView.innerHTML = next ? MEANING : poemHTML;
    poemCap.textContent = next ? 'one star at a time — the only way to move' : 'every star at once — impossible to hold';
    tryVal.textContent = next ? 'pick one, and move' : 'the whole sky, at once';
    poemView.style.opacity = '1';
  }, 190);
});
