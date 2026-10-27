/* viewer.js — abas da seção Plataforma e ampliação das telas.
   As telas são imagens estáticas: aqui só se escolhe qual ver e se amplia para olhar de perto. */
(function () {
  var HC = window.HC;
  if (!HC) return;

  var root = HC.$("[data-viewer]");
  if (root) {
    var tabs = HC.$$('[role="tab"]', root);
    var panels = HC.$$('[role="tabpanel"]', root);
    var byKey = {};
    tabs.forEach(function (t) { byKey[t.getAttribute("data-key")] = t; });

    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
      root.setAttribute("data-spy-id", tab.getAttribute("data-key"));
      if (focus) tab.focus();
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (!next) return;
        e.preventDefault();
        select(next, true);
      });
    });

    // Links do menu e de outros pontos que apontam para uma tela específica
    HC.$$('a[href^="#"]').forEach(function (a) {
      var key = a.getAttribute("href").slice(1);
      if (!byKey[key]) return;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        select(byKey[key], false);
        root.scrollIntoView({ behavior: HC.reduced ? "auto" : "smooth", block: "start" });
        if (history.replaceState) history.replaceState(null, "", "#" + key);
      });
    });

    HC.showTab = function (key) {
      if (!byKey[key]) return false;
      select(byKey[key], false);
      root.scrollIntoView({ behavior: HC.reduced ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", "#" + key);
      return true;
    };

    var start = location.hash.slice(1);
    if (byKey[start]) select(byKey[start], false);
  }

  // Ampliação (caixa de diálogo nativa: foco preso, Esc fecha)
  var dlg = HC.$("[data-lb]");
  if (!dlg || typeof dlg.showModal !== "function") return;
  var img = HC.$("img", dlg);
  var cap = HC.$("[data-lb-cap]", dlg);
  var scroller = HC.$("[data-lb-scroll]", dlg);

  HC.$$("[data-zoom]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = HC.$("img", btn);
      img.src = btn.getAttribute("data-full");
      img.alt = src ? src.alt : "";
      cap.textContent = btn.getAttribute("data-title") + " · toque ou clique fora para fechar";
      document.body.classList.add("lb-open");
      dlg.showModal();
      scroller.scrollTop = 0;
      scroller.scrollLeft = 0;
    });
  });

  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || e.target === scroller || e.target.closest("[data-lb-close]")) dlg.close();
  });
  dlg.addEventListener("close", function () {
    document.body.classList.remove("lb-open");
    img.removeAttribute("src");
  });
})();
