(function () {
  var HC = window.HC;
  if (!HC) return;

  var header = HC.$("[data-header]");
  if (!header) return;

  var btn = HC.$("[data-nav-toggle]", header);
  var panel = HC.$("[data-nav-panel]", header);
  var links = HC.$$("[data-nav]");
  var spies = HC.$$("[data-spy]");
  var ticking = false;

  function setCurrent() {
    var line = 120;
    var current = "";
    spies.forEach(function (section) {
      if (section.getBoundingClientRect().top - line <= 0) current = section.getAttribute("data-spy-id") || section.id;
    });
    links.forEach(function (link) {
      if (current && link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      setCurrent();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  setCurrent();

  if (!btn || !panel) return;

  var trap = null;

  function focusables() {
    return [btn].concat(HC.$$("a", panel));
  }

  function onKey(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
      return;
    }
    if (e.key !== "Tab") return;
    var nodes = focusables();
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    trap = onKey;
    document.addEventListener("keydown", trap);
    var firstLink = HC.$("a", panel);
    if (firstLink) firstLink.focus();
  }

  function closeMenu(restore) {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    if (trap) document.removeEventListener("keydown", trap);
    trap = null;
    if (restore) btn.focus();
  }

  btn.addEventListener("click", function () {
    if (btn.getAttribute("aria-expanded") === "true") closeMenu(true);
    else openMenu();
  });

  HC.$$("a", panel).forEach(function (link) {
    link.addEventListener("click", function () { closeMenu(false); });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && btn.getAttribute("aria-expanded") === "true") {
      closeMenu(false);
    }
  });
})();
