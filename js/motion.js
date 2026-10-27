(function () {
  var HC = window.HC;
  if (!HC) return;

  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  HC.$$(".reveal").forEach(function (el) {
    HC.inView(el, function () { el.classList.add("is-in"); }, { threshold: 0.18 });
  });

  var flow = HC.$("[data-flow]");
  if (!flow) return;

  if (HC.reduced) {
    flow.classList.add("is-drawn");
    return;
  }

  HC.inView(flow, function () {
    flow.classList.add("is-drawn");
    var steps = HC.$$(".step", flow);
    if (!steps.length) return;
    steps.forEach(function (step) { step.classList.remove("on"); });
    steps.forEach(function (step, i) {
      window.setTimeout(function () {
        steps.forEach(function (item) { item.classList.remove("on"); });
        step.classList.add("on");
        if (i === steps.length - 1) {
          window.setTimeout(function () {
            steps.forEach(function (item) { item.classList.remove("on"); });
            if (steps[2]) steps[2].classList.add("on");
          }, 700);
        }
      }, 180 + i * 220);
    });
  }, { threshold: 0.35 });
})();
