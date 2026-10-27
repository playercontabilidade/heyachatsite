# AGENTS.md — Landing Heya!Chat, versão 2 ("Sinal noturno")

Segunda proposta de landing page do **Heya!Chat** (https://www.heyachat.com.br/). Existe uma versão 1 (pasta irmã `../heyachat_site`, clara, com demos). **Esta é outra versão, em pasta própria, para os gestores escolherem.** Não altere nada fora desta pasta.

## O que construir

Um site estático (HTML + CSS + JS puro) **escuro, moderno e sério**, que segue as imagens de conceito em `design/` (abra `design/concept.html` no navegador e os PNGs `design/0*.png`). O conceito é a referência visual: composição, escala dos títulos, fluxo de 5 passos, visualizador de telas.

## Leia antes de escrever qualquer linha (nesta ordem)

1. `DESIGN.md` — cores, tipografia, espaço, componentes, movimento, o que evitar.
2. `index.html` + `style.css` (estado atual) e `design/*.png` (capturas atuais). `design/concept.html` é o rascunho inicial e está **desatualizado**; em caso de conflito vale o site e o `docs/01`.
3. `docs/01-page-map-and-copy.md` — seções, ids e texto final em pt-BR (copie literalmente).
4. `docs/02-build-plan.md` — tarefas, movimento, aceite.
5. `reference/` — fonte da verdade do produto (`especificacao_sistema_atendimento.pdf`, `heyachat-site-copy.md`) e `reference/v1-index.html` (texto da versão 1, para copiar FAQ, perfis, WhatsApp).

## Regras duras

- Os arquivos de `reference/` (inclusive `v1-index.html`) são **fonte de consulta** e contêm termos que esta versão proíbe (demonstração, checklist). Copie só o que as seções do `docs/01` mandam copiar.

- **Sem framework e sem build.** Só `index.html`, `style.css`, `js/*.js`, `fonts/`, `images/`.
- **Funciona com duplo clique (`file://`)**: scripts clássicos com `defer`, cada um em IIFE, tudo em `window.HC`. Nada de `type="module"`, nada de `fetch` local, caminhos relativos. A pasta deve poder ser publicada em subcaminho (`/v2/`), então nada de caminho começando com `/`.
- **Sem demonstração.** Nada de iframe, demo operável, simulador, "ver funcionando" nem a palavra **demonstração/demo** em lugar nenhum (texto, botão, alt, aria, comentário visível). As telas do produto são **imagens estáticas** de `images/`.
- **Sem experiência de uso do app.** O visitante não testa nem "usa" nenhuma tela: nada de aceitar/recusar, arrastar, digitar, abas ou filtros que reajam dentro das telas, cartões clicáveis que simulem o sistema, nem simulador. Telas e mini cartões são ilustração estática: sem `cursor:pointer`, sem hover que simule ação, não focáveis (botões desenhados com `aria-hidden="true"` e `tabindex="-1"` ou `<span>`). Interação permitida só na própria página: menu, FAQ, âncoras, movimento de entrada, **a chave "Sem o Heya!Chat / Com o Heya!Chat"** na seção Problema (`js/switch.js`), **as abas e a ampliação das telas** da seção Plataforma (`js/viewer.js`: só escolhem qual imagem estática ver e a abrem em tamanho grande) e o brilho dos cartões ao passar o mouse (`js/hover.js`) e **a volta única do ícone até o celular da foto no hero** (`js/hero.js`; decorativa, sem loop). Nada disso simula o app: dentro da imagem nada reage.
- **Cor ao interagir:** botões, links, chave, cartões e perguntas mudam de cor no hover/foco/clique (ver `DESIGN.md`, "Interação"). Sempre com contraste mantido e foco visível.
- **Telas do produto soltas:** na seção Plataforma a tela fica **sem cartão atrás e sem degradê**, grande, na largura do conteúdo, com cantos arredondados e sombra suave; texto em cima.
- **Fundo alternado azul/branco, corte reto:** hero azul, Problema branco, Central azul, Fluxo branco, Plataforma azul, WhatsApp branco, Perfis azul, Perguntas branco, CTA azul. **Sem seção laranja e sem degradê entre módulos** (ver `DESIGN.md`).
- **Sem processo ágil.** Nada de checklist de processo, sprint, scrum, "gerar entregas". O funil do CRM (Lead → Em conversa → Proposta → Fechado) é do produto e pode aparecer; "metodologia ágil" não.
- **Nada inventado:** sem métricas de resultado, depoimentos, logos de clientes, preços, planos. Dados que aparecem nas telas são fictícios; rotule "Dados de exemplo" onde houver tela.
- **Sem selo/pill acima do h1.** Sem emoji como ícone (ícones SVG `<symbol>` com `currentColor`, traço 1,75 px).
- **Botão primário: texto `--accent-ink` sobre `--accent`.** Branco sobre laranja é proibido.
- **Acessibilidade é critério de aceite:** teclado, foco visível, `prefers-reduced-motion` deixa tudo estático e visível, contraste conforme `DESIGN.md`, `alt` útil nas telas.
- Não usar número de WhatsApp, e-mail ou texto do Impostograma.
- **Sem botão "Falar com a equipe"** nem link de WhatsApp/contato. O único botão de ação é **Entrar** (header) e **Entrar na plataforma** (hero, CTA final e menu mobile), apontando para `https://app.heyachat.com.br`.
- Fontes: Manrope (títulos) e Inter (texto) em `fonts/*.woff2`, self-host. Se os arquivos não estiverem na pasta, o CSS cai para `Inter`/`system-ui` sem quebrar o layout. Não use CDN.

## Como trabalhar

- Uma tarefa do `docs/02-build-plan.md` por vez. Termine, abra o `index.html` em 1440×900, 1024×768 e 390×800, confira o console, marque `[x]`.
- Novos estilos em `style.css` dentro de blocos `/* ── Seção ── */`. Novos scripts em `js/<nome>.js`, sempre retornando cedo se o elemento não existir.
- Ambiguidade: escolha o padrão mais simples e anote em `docs/02-build-plan.md` ("Desvios").

## Verificação

Sem erros no console, `scrollWidth <= innerWidth` em 390/768/1440, ids únicos, `grep -i -E "demonstra|demo|ágil|agil|checklist|sprint|iframe"` no `index.html`, `style.css` e `js/` sem resultados, tudo operável por teclado.
