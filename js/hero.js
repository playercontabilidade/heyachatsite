/* hero.js — o ícone da Heya!Chat faz uma volta e pousa no celular da foto, uma vez só.
   Deixa um rastro tracejado laranja. Com movimento reduzido já aparece pronto. */
(function () {
  var HC = window.HC;
  if (!HC) return;
  var box = HC.$("[data-hp]");
  if (!box) return;
  var svg = HC.$("svg", box);
  var path = HC.$("[data-hp-path]", box);
  var reveal = HC.$("[data-hp-reveal]", box);
  var logo = HC.$("[data-hp-logo]", box);
  if (!svg || !path || !reveal || !logo) return;

  var L = path.getTotalLength();
  var mq = window.matchMedia("(max-width: 900px)");
  var VB = { d: [0, 0, 1376, 768], m: [640, 0, 736, 768] };
  var vb = VB.d;

  function setView() {
    vb = mq.matches ? VB.m : VB.d;
    svg.setAttribute("viewBox", vb.join(" "));
  }

  function place(p, scale) {
    var pt = path.getPointAtLength(L * p);
    var ahead = path.getPointAtLength(Math.min(L, L * p + 4));
    var tilt = Math.max(-25, Math.min(25, Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI * 0.25));
    logo.style.left = ((pt.x - vb[0]) / vb[2] * 100).toFixed(3) + "%";
    logo.style.top = ((pt.y - vb[1]) / vb[3] * 100).toFixed(3) + "%";
    logo.style.transform = "translate(-50%,-50%) rotate(" + tilt.toFixed(1) + "deg) scale(" + (scale || 1) + ")";
  }

  function progress(p) {
    reveal.style.strokeDasharray = L;
    reveal.style.strokeDashoffset = L * (1 - p);
  }

  function ease(k) { return k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; }

  setView();
  mq.addEventListener && mq.addEventListener("change", function () { setView(); place(done ? 1 : lastP, 1); });

  var done = false, lastP = 0;
  function finish() { done = true; progress(1); place(1, 1); box.classList.add("is-done"); }

  if (HC.reduced) { logo.style.opacity = 1; finish(); return; }

  progress(0); place(0, 1);
  var DUR = 2800, DELAY = 900, t0 = 0;
  function frame(now) {
    if (!t0) t0 = now;
    var k = Math.min(1, Math.max(0, (now - t0) / DUR));
    lastP = ease(k);
    progress(lastP);
    place(lastP, k < 1 ? 1 : 1 + .18 * Math.sin(Math.min(1, (now - t0 - DUR) / 300) * Math.PI));
    if (k < 1 || now - t0 - DUR < 300) requestAnimationFrame(frame); else finish();
  }
  function go() {
    logo.style.opacity = 1;
    setTimeout(function () { requestAnimationFrame(frame); }, DELAY);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: .25 });
    io.observe(box);
  } else go();
})();
