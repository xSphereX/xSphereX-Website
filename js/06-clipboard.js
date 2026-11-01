/* xSphereX / sphere. — copy buttons + toast
   Any element with data-copy copies its value and confirms with a toast. */

var toast = document.getElementById('toast');
var toastMsg = document.getElementById('toastMsg');
var toastTimer = null;

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
}
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    var msg = btn.getAttribute('data-copy-msg') || 'Copied!';
    /* window.Sphere.copy already falls back to execCommand when needed */
    window.Sphere.copy(text).then(function () { showToast(msg); })
      .catch(function () { showToast(msg); });
  });
});
