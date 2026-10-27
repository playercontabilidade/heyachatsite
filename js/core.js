(function () {
  var HC = window.HC = window.HC || {};

  HC.$ = function (sel, root) {
    return (root || document).querySelector(sel);
  };

  HC.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  HC.reduced = motionQuery.matches;

  HC.inView = function (el, cb, opts) {
    if (!el) return;
    if (HC.reduced || !("IntersectionObserver" in window)) {
      cb(el);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        cb(el);
      });
    }, opts || { threshold: 0.2 });
    io.observe(el);
  };

  function faqOnSmall() {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    var open = HC.$("#faq details[open]");
    if (open) open.removeAttribute("open");
  }

  document.documentElement.classList.add("js");
  faqOnSmall();
})();
