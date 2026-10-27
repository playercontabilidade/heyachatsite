# 02 · Plano de construção

Marque `[x]` ao concluir cada tarefa. Em cada uma: abrir em 1440×900, 1024×768 e 390×800; console limpo; sem rolagem horizontal.

- [ ] **T1 · Fundação.** `index.html` (head, metadados, `<symbol>`s de ícone: seta, check, transferir, escudo, calendário, microfone), `style.css` com `:root` copiando os tokens de `DESIGN.md`, `@font-face` Manrope/Inter apontando para `fonts/` com fallback, reset, `.wrap`, botões (`.btn`, `.btn-p`, `.btn-s`), tipografia (`.display`, `.kicker`), foco visível, `.reveal`. `js/core.js` com `window.HC` (`$`, `$$`, `reduced`, `inView`). Botões com cor ao interagir (ver `DESIGN.md`, "Interação").
- [ ] **T2 · Header** com menu mobile (painel, foco preso, `Esc`), link ativo por rolagem.
- [ ] **T3 · Hero** (`01`): título, lede, botões, provas, moldura com `tela-chat.webp`, brilho, grade de pontos, foto da atendente + ícone que faz uma volta e pousa no celular (`js/hero.js`).
- [ ] **T4 · Problema → fila** (`02`): fundo branco com cartões escuros, chave Sem/Com (`js/switch.js`), linhas de ligação em SVG responsivo.
- [ ] **T5 · Fluxo** (`03`): 5 passos, linha, mini cartões estáticos.
- [ ] **T6 · Plataforma** (`04`): visualizador com abas (`js/viewer.js`), tela grande solta, ampliação em `<dialog>`, fluxo do Robô em HTML. Seção Central (`#central`): diagrama horizontal com a tela da fila.
- [ ] **T7 · WhatsApp, Perfis e organizações** (`05`, `06`).
- [ ] **T8 · FAQ e CTA final, rodapé** (`07`, `08`, `09`).
- [ ] **T9 · Movimento** (`js/motion.js` + CSS): ver abaixo.
- [ ] **T10 · Aceite**: rodar a verificação do `AGENTS.md`, contraste, teclado, `prefers-reduced-motion`, 3 larguras, peso total (HTML+CSS+JS+imagens < 1,5 MB sem fontes), Lighthouse (se disponível) ≥ 90 em acessibilidade e boas práticas.

## Movimento (T9)

Curva `cubic-bezier(.22,1,.36,1)`; 400 a 700 ms; só `transform` e `opacity`.

1. **Entrada do hero:** as 3 linhas do título sobem com 80 ms de atraso entre elas; a moldura sobe.
2. **Rolagem:** `.reveal` com subida de 24 px via `IntersectionObserver` (uma vez); 
3. **Fluxo:** a linha se desenha (`scaleX` de 0 a 1 com `transform-origin: left`) quando a seção entra na tela, e cada passo acende em sequência.
4. **Telas e cartões:** no hover (só desktop) a tela sobe 4 px e ganha contorno e brilho laranja; os cartões (`.hov`) sobem 3 px, ganham borda laranja e um foco de luz que segue o cursor (`js/hover.js`).
5. **Sem** contadores animados de números, **sem** autoplay de qualquer demo, **sem** bibliotecas externas.
6. **`prefers-reduced-motion: reduce`:** nada se move, tudo visível desde o início (`.reveal` já visível, linha do fluxo cheia).

## Aceite (resumo)

- Fiel ao conceito (`design/`): escala dos títulos, alternância azul/branco em corte reto, cartões, fluxo, visualizador de telas.
- Nenhuma tela reage ao clique/teclado como o app; nenhum simulador. Abas e ampliação só trocam/abrem a imagem estática.
- Nenhum iframe, nenhum "demo/demonstração", nenhum "ágil/checklist/sprint".
- Contraste: texto normal ≥ 4,5:1, laranja como texto só sobre escuro; nas seções brancas usar `--paper-accent`.
- Todas as imagens com `alt`, `width` e `height` (sem salto de layout).
- Tabela de âncoras do `01` funcionando; menu e FAQ por teclado.
- Foco visível em todos os controles; ordem de tabulação lógica.

## Perguntas em aberto (padrão usado até o dono responder)

| Pergunta | Padrão |
|---|---|
| Logo em SVG | usar `images/logo-mark.png` |
| Mostrar o modo QR code | só a frase de exclusividade, sem lista própria |
| Fontes | se `fonts/` estiver vazia, cai para Inter/`system-ui` |

## Desvios
(O Cursor anota aqui qualquer escolha fora do plano.)
