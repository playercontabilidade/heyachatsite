/* switch.js — chave "Sem o Heya!Chat / Com o Heya!Chat" na seção Problema.
   Só troca o estado visual da ilustração; não simula o app. */
(function () {
  var HC = window.HC;
  if (!HC) return;
  var root = HC.$("[data-switch]");
  if (!root) return;
  var chaos = HC.$("[data-chaos]", root);
  var cap = HC.$("[data-caption]", root);
  var buttons = HC.$$("[data-mode]", root).filter(function (b) { return b.tagName === "BUTTON"; });
  var panels = HC.$$("[data-panel]", root);
  var text = {
    sem: "Cada número num celular, cada histórico com uma pessoa.",
    com: "Todos os números na mesma fila. O histórico fica com a empresa."
  };

  function set(mode) {
    chaos.setAttribute("data-mode", mode);
    root.setAttribute("data-mode", mode);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode));
    });
    panels.forEach(function (p) {
      p.setAttribute("aria-hidden", String(p.getAttribute("data-panel") !== mode));
    });
    if (cap) cap.textContent = text[mode];
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { set(b.getAttribute("data-mode")); });
  });
  set("com");
})();
