/* fly.js — o logo voa em volta da tela do hero, deixa um rastro tracejado laranja e para em cada ponto forte.
   Automático e clicável. Só ilustra: nada simula o app. Com movimento reduzido não há voo,
   só a lista de pontos fortes (botões + cartão). */
(function () {
  var HC = window.HC;
  if (!HC) return;
  var box = HC.$("[data-box]");
  if (!box) return;

  var frame = HC.$(".frame", box);
  var fly = HC.$("[data-fly]", box);
  var cv = HC.$("canvas", fly);
  var bird = HC.$(".bird", fly);
  var dots = HC.$$(".stop", fly);
  var card = HC.$("[data-fly-card]", box);
  var pills = HC.$$("[data-stop]");
  var pauseBtn = HC.$("[data-fly-pause]");
  if (!frame || !card || !pills.length) return;

  var N = pills.length;
  var ctx = cv.getContext && cv.getContext("2d");
  var mq = window.matchMedia("(max-width: 900px)");
  var PAD = { l: 64, t: 72, r: 64, b: 72 };
  var DWELL = 4200;
  var TAIL_MS = 1700;
  var ORANGE = "255,122,26";

  var kEl = HC.$(".fk", card), hEl = HC.$("h3", card), pEl = HC.$(".fp", card), aEl = HC.$(".flink", card);
  var cur = 0;          // ponto em que o logo está (ou para onde vai)
  var shown = -1;       // ponto cujo cartão está na tela
  var paused = HC.reduced;
  var hold = false;     // ponteiro ou foco sobre o cartão/botões
  var live = false;     // loop rodando
  var moving = false;
  var s0 = 0, ds = 0, t0 = 0, dur = 1, nextAt = 0, startIdx = 0;
  var path = [], cum = [], L = 1, stopS = [], F = null, W = 0, H = 0, mobile = false;
  var hist = [];
  var raf = 0;

  function setCard(i) {
    var p = pills[i];
    kEl.textContent = "Ponto forte " + (i + 1) + " de " + N;
    hEl.textContent = p.getAttribute("data-title");
    pEl.textContent = p.getAttribute("data-text");
    aEl.firstChild.nodeValue = p.getAttribute("data-cta") + " ";
    aEl.setAttribute("href", p.getAttribute("data-href"));
    aEl.setAttribute("data-go", p.getAttribute("data-href").slice(1));
    shown = i;
  }

  function mark(i) {
    pills.forEach(function (b, j) { b.setAttribute("aria-pressed", String(j === i)); });
    dots.forEach(function (d, j) { d.classList.toggle("is-on", j === i); });
  }

  function placeCard(i) {
    if (mobile || box.classList.contains("is-static")) { card.style.left = card.style.top = ""; return; }
    var sp = pointAt(stopS[i]);
    var bx = sp.x - PAD.l, by = sp.y - PAD.t;      // coordenadas dentro de .stage-box
    var w = card.offsetWidth, h = card.offsetHeight;
    var bw = box.clientWidth, bh = box.clientHeight;
    var x, y;
    if (bx < bw / 2) { x = bx + 34; y = by - h / 2; }
    else { x = bx - 34 - w; y = by - h / 2; }
    x = Math.max(8, Math.min(bw - w - 8, x));
    y = Math.max(8, Math.min(bh - h - 8, y));
    card.style.left = Math.round(x) + "px";
    card.style.top = Math.round(y) + "px";
  }

  function showCard(i) {
    if (shown !== i) setCard(i);
    placeCard(i);
    card.classList.remove("is-away");
  }

  /* ── Caminho: spline fechada que contorna a tela ── */
  function build() {
    var space = frame.getBoundingClientRect().left;
    mobile = mq.matches || space < 48;
    box.classList.toggle("is-inline", mobile);
    var bw = box.clientWidth, bh = box.clientHeight;
    var d = mobile ? -26 : Math.max(16, Math.min(46, space - 30));
    var pad = mobile ? { l: 8, t: 8, r: 8, b: 8 } : { l: 70, t: 70, r: 70, b: 70 };
    PAD = pad;
    W = bw + pad.l + pad.r; H = bh + pad.t + pad.b;
    F = { x: frame.offsetLeft + pad.l, y: frame.offsetTop + pad.t, w: frame.offsetWidth, h: frame.offsetHeight };
    var xl = F.x - d, xr = F.x + F.w + d, yt = F.y - d, yb = F.y + F.h + d, cx = F.x + F.w / 2;
    var pts = [
      [xl, F.y + .2 * F.h, 0],
      [xl - d * .15, F.y + .5 * F.h, -1],
      [xl, F.y + .8 * F.h, 1],
      [F.x + .25 * F.w, yb + d * .1, -1],
      [cx, yb + d * .1, -1],
      [F.x + .75 * F.w, yb + d * .1, -1],
      [xr, F.y + .8 * F.h, 2],
      [xr + d * .15, F.y + .5 * F.h, -1],
      [xr, F.y + .2 * F.h, 3],
      [F.x + .75 * F.w, yt - d * .1, -1],
      [cx, yt - d * .1, -1],
      [F.x + .25 * F.w, yt - d * .1, -1]
    ];
    var STEPS = 36, n = pts.length;
    path = []; stopS = [];
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      for (var k = 0; k < STEPS; k++) {
        var t = k / STEPS, t2 = t * t, t3 = t2 * t;
        path.push({
          x: .5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          y: .5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
        });
      }
    }
    cum = [0];
    for (var j = 1; j <= path.length; j++) {
      var a = path[j - 1], b = path[j % path.length];
      cum.push(cum[j - 1] + Math.hypot(b.x - a.x, b.y - a.y));
    }
    L = cum[cum.length - 1];
    pts.forEach(function (p, idx) { if (p[2] >= 0) stopS[p[2]] = cum[idx * STEPS]; });
    // tamanho real do canvas e posição dos marcadores
    fly.style.inset = (-pad.t) + "px " + (-pad.r) + "px " + (-pad.b) + "px " + (-pad.l) + "px";
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots.forEach(function (dot, idx) {
      var sp = pointAt(stopS[idx]);
      dot.style.left = sp.x + "px"; dot.style.top = sp.y + "px";
    });
  }

  function pointAt(s) {
    s = ((s % L) + L) % L;
    var lo = 0, hi = cum.length - 1;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (cum[mid] <= s) lo = mid; else hi = mid; }
    var a = path[lo % path.length], b = path[(lo + 1) % path.length];
    var seg = cum[lo + 1] - cum[lo] || 1, f = (s - cum[lo]) / seg;
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  }

  function ease(k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }

  function goTo(i, user) {
    if (i === cur && !moving && shown === i) return;
    var from = moving ? currentS() : stopS[cur];
    var fwd = ((stopS[i] - from) % L + L) % L;
    ds = user && fwd > L / 2 ? -(L - fwd) : fwd;
    if (ds === 0) ds = 0.001;
    s0 = from; t0 = performance.now();
    dur = Math.max(1500, Math.min(3200, Math.abs(ds) / .24));
    moving = true; startIdx = cur; cur = i;
    mark(i);
    card.classList.add("is-away");
    nextAt = Infinity;
    if (!live) { shown = -1; setCard(i); placeCard(i); card.classList.remove("is-away"); snap(); moving = false; nextAt = Infinity; }
  }

  function currentS() { return s0 + ds * ease(Math.min(1, (performance.now() - t0) / dur)); }

  function snap() {
    var sp = pointAt(stopS[cur]);
    place(sp.x, sp.y, 0, cur > 1 ? -1 : 1, 0);
  }

  function place(x, y, tilt, dir, bob) {
    bird.style.transform = "translate3d(" + (x - 24).toFixed(1) + "px," + (y - 24 + bob).toFixed(1) + "px,0) rotate(" + tilt.toFixed(1) + "deg) scaleX(" + dir + ")";
  }

  function draw(now) {
    var s, resting = !moving;
    if (moving) {
      var k = Math.min(1, (now - t0) / dur);
      s = s0 + ds * ease(k);
      if (k >= 1) {
        moving = false; s = stopS[cur];
        showCard(cur);
        nextAt = now + (hold ? 8000 : (userMove ? 7000 : DWELL));
        userMove = false;
      }
    } else {
      s = stopS[cur];
      if (!paused && !hold && now >= nextAt) { goTo((cur + 1) % N, false); }
      else if (hold && nextAt !== Infinity) { nextAt = Math.max(nextAt, now + 1500); }
    }
    var p = pointAt(s), q = pointAt(s + 6), r = pointAt(s - 6);
    var dx = q.x - r.x, dy = q.y - r.y;
    var dir = moving ? (dx >= 0 ? 1 : -1) : (cur > 1 ? -1 : 1);
    var tilt = moving ? Math.max(-22, Math.min(22, Math.atan2(dy, Math.abs(dx) + .001) * 40)) * (dir) : 0;
    var bob = paused ? 0 : Math.sin(now / 380) * (moving ? 2.5 : 4);
    place(p.x, p.y, tilt, dir, bob);
    hist.push({ x: p.x, y: p.y + bob, t: now });
    while (hist.length && now - hist[0].t > TAIL_MS) hist.shift();
    paint(now);
  }

  function paint(now) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    // rota completa, bem fraca
    ctx.setLineDash([2, 11]); ctx.lineDashOffset = 0;
    ctx.lineWidth = 1.5; ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(" + ORANGE + ",.20)";
    ctx.beginPath();
    for (var i = 0; i <= path.length; i++) { var c = path[i % path.length]; if (i) ctx.lineTo(c.x, c.y); else ctx.moveTo(c.x, c.y); }
    ctx.stroke();
    // rastro tracejado atrás do logo, que some com o tempo
    if (hist.length < 2) return;
    ctx.setLineDash([5, 9]); ctx.lineWidth = 3;
    var acc = 0;
    for (var j = hist.length - 1; j > 0; j--) {
      var a = hist[j], b = hist[j - 1];
      var age = (now - b.t) / TAIL_MS;
      ctx.lineDashOffset = -acc;
      ctx.strokeStyle = "rgba(" + ORANGE + "," + (.95 * (1 - age)).toFixed(3) + ")";
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      acc += Math.hypot(a.x - b.x, a.y - b.y);
    }
  }

  var userMove = false;
  function loop(now) {
    if (!live) return;
    draw(now);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (live || HC.reduced) return; live = true; raf = requestAnimationFrame(loop); }
  function stop() { live = false; cancelAnimationFrame(raf); }

  function choose(i) {
    userMove = true;
    if (HC.reduced || !live) { cur = i; mark(i); setCard(i); card.classList.remove("is-away"); if (!HC.reduced) { snap(); placeCard(i); } return; }
    goTo(i, true);
  }

  function setPaused(p) {
    paused = p;
    box.classList.toggle("is-paused", p);
    if (pauseBtn) {
      pauseBtn.setAttribute("aria-pressed", String(p));
      pauseBtn.setAttribute("aria-label", p ? "Retomar o voo do logo" : "Pausar o voo do logo");
      var u = HC.$("use", pauseBtn); if (u) u.setAttribute("href", p ? "#i-play" : "#i-pause");
    }
    if (!p && !moving) nextAt = performance.now() + 1200;
  }

  /* ── ligações ── */
  pills.forEach(function (b, i) { b.addEventListener("click", function () { choose(i); }); });
  dots.forEach(function (d, i) { d.addEventListener("click", function () { choose(i); }); });
  if (pauseBtn) pauseBtn.addEventListener("click", function () { setPaused(!paused); });

  [card].concat(pills).forEach(function (el) {
    if (!el) return;
    el.addEventListener("pointerenter", function () { hold = true; });
    el.addEventListener("pointerleave", function () { hold = false; });
    el.addEventListener("focusin", function () { hold = true; });
    el.addEventListener("focusout", function () { hold = false; });
  });

  aEl.addEventListener("click", function (e) {
    var key = aEl.getAttribute("data-go");
    if (HC.showTab && HC.showTab(key)) e.preventDefault();
  });

  function layout() {
    build();
    if (live) { var sp = pointAt(stopS[cur]); hist = []; if (!moving) { place(sp.x, sp.y, 0, cur > 1 ? -1 : 1, 0); showCard(cur); } }
  }

  var rt = 0;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 120); });

  /* ── início ── */
  mark(0); setCard(0);
  if (HC.reduced) {
    box.classList.add("is-static");
    setPaused(true);
    return;
  }
  var go = function () {
    build();
    box.classList.add("is-live");
    var sp = pointAt(stopS[0]);
    place(sp.x, sp.y, 0, 1, 0);
    placeCard(0);
    nextAt = performance.now() + 2600;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && document.visibilityState === "visible") start(); else stop(); });
      }, { threshold: 0.05 }).observe(box);
      document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); });
    } else start();
  };
  if (document.readyState === "complete") go(); else window.addEventListener("load", go);
})();
