/* hover.js — brilho que acompanha o cursor nos cartões (.hov).
   Só mexe em duas variáveis CSS; sem hover (toque), o cartão reage ao :active. */
(function () {
  var HC = window.HC;
  if (!HC || HC.reduced) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var card = null, x = 0, y = 0, queued = false;
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".hov");
    if (!c) return;
    card = c; x = e.clientX; y = e.clientY;
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (x - r.left).toFixed(0) + "px");
      card.style.setProperty("--my", (y - r.top).toFixed(0) + "px");
    });
  }, { passive: true });
})();
