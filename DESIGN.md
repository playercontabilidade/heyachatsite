# DESIGN.md — Heya!Chat (direção "Sinal noturno")

Esta direção parte das três referências do dono (preto profundo com uma cor forte, blocos verticais de cor, cartões de interface flutuando em volta do produto) e as traduz para um produto de atendimento: **sério, rápido, sem ruído**. A cor forte é a laranja da marca, usada como sinal (ação e "ao vivo"), nunca como papel de parede.

Esta é a **versão 2** do site, entregue em pasta própria (`heyachat_site_v2`) como alternativa à versão 1; os gestores escolhem. Sem demonstrações interativas e sem conteúdo de processo ágil.

Base: o site atual do Heya!Chat e o protótipo `visao-analista` (mesmos tokens de marca: navy `#1e3a5f`, laranja `#fc7b15`, violeta `#7059c4`). Não foi consultado nenhum catálogo externo de sites; a direção vem das referências enviadas.

## Princípios

1. **Produto na frente.** O primeiro e o maior elemento visual é a tela real do sistema, nunca ilustração genérica.
2. **Uma cor de sinal.** Laranja só para: botão principal, indicador "ao vivo", número que importa, borda ao passar o mouse. Tudo o mais é grafite e azul-noite. Não existe seção laranja.
3. **Ousadia na escala, não na decoração.** Títulos enormes e curtos, muito espaço, poucas camadas. Sem degradê roxo-azul, sem vidro fosco em tudo, sem emoji.
4. **Azul e branco alternados, em corte reto.** As seções alternam azul-noite (`--ink-900`) e branco (`--paper`): hero azul, Problema branco, Central azul, Fluxo branco, Plataforma azul, WhatsApp branco, Perfis azul, Perguntas branco, CTA final azul. **Sem degradê entre módulos e sem seção laranja.** O corte é reto por decisão do dono.
5. **Comportado onde há dado.** Telas, números e estados são sóbrios e legíveis; o movimento acontece em volta (cartões, linhas, brilho), nunca atrapalha a leitura.

## Cor

| Token | Valor | Papel |
|---|---|---|
| `--ink-950` | `#05070D` | painel do menu mobile, caixa de ampliação |
| `--ink-900` | `#0A0F1C` | fundo de toda a página |
| `--ink-850` | `#0F1629` | superfície (cartões) |
| `--ink-800` | `#151E36` | superfície elevada |
| `--line` | `rgba(255,255,255,.09)` | bordas e divisórias no escuro |
| `--text` | `#EAF0FA` | texto principal no escuro (16,7:1) |
| `--text-dim` | `#9AA8C0` | texto de apoio no escuro (8,0:1) |
| `--accent` | `#FF7A1A` | ação principal e sinal "ao vivo" (7,3:1 sobre `--ink-900`) |
| `--accent-ink` | `#0A0F1C` | texto sobre laranja (7,3:1) |
| `--paper` | `#F2F5F9` | fundo das seções brancas |
| `--paper-ink` | `#0A1226` | texto nas seções brancas (18,6:1 sobre branco) |
| `--paper-dim` | `#51607A` | apoio nas seções brancas (6,4:1 sobre branco, 5,8:1 sobre `--paper`) |
| `--paper-accent` | `#C2410C` | laranja como texto nas seções brancas (5,2:1 sobre branco, 4,7:1 sobre `--paper`) |
| `--paper-line` | `#DFE5EE` | bordas dos cartões nas seções brancas |
| `--accent-glow` | `rgba(255,122,26,.18)` | brilho atrás do produto |
| `--violet` | `#7059C4` | linhas de fluxo, realces secundários (só como traço, nunca texto) |
| `--ok` | `#3DDC97` | estado "resolvida" / online |

Regras: laranja nunca como texto pequeno sobre branco (use `--paper-accent`); branco sobre laranja é proibido (use `--accent-ink`); estado nunca só por cor.

## Tipografia

- **Títulos:** Manrope 700/800, `letter-spacing: -.04em`, `line-height: 1.02`. Geométrica e arredondada, "suave" sem ser infantil.
- **Texto:** Inter 400/500/600, 16–18 px, linhas de 60–70 caracteres.
- **Escala (desktop):** display 88/92 · h2 56/60 · h3 28/34 · lede 20/32 · corpo 17/28 · rótulo 13 caixa-alta `.12em`.
- Em telas ≤ 600 px: display 44, h2 34.
- **Hospedagem:** self-host em `fonts/` (woff2) para abrir por `file://` e não depender de CDN. Se os arquivos não estiverem na pasta, o site cai para `Inter` e `system-ui`.
- As imagens de conceito desta etapa usam Inter Display no lugar de Manrope, só porque a Manrope não pôde ser baixada no ambiente de geração.

## Alternância azul / branco (sem transição)

Seções brancas levam a classe `.light` (fundo `--paper`, texto `--paper-ink`, kicker `--paper-accent`). O corte entre azul e branco é **reto, sem degradê** (pedido do dono). Degradê só dentro de componentes (brilho do hero, brilho do título final, linha violeta → laranja do fluxo). Nas seções brancas os cartões são brancos com borda `--paper-line`; no Problema os cartões continuam **escuros** (`--ink-850`) sobre o branco, para dar contraste. O bloco `.light` no fim do `style.css` concentra essas trocas.

## Espaço e forma

- Escala de 8 px: 8 · 16 · 24 · 32 · 48 · 64 · 96 · 140.
- Seção: `padding-block: 112px` (80 no celular). Conteúdo até 1200 px; produto pode sangrar até 1320.
- Raios: 12 (chips, campos) · 20 (cartões) · 28 (moldura do produto) · 999 (botões).
- Profundidade: borda de 1 px + um brilho largo e suave (`0 40px 120px -40px accent-glow`). Sem sombras múltiplas.

## Componentes

- **Botão primário:** pílula, laranja, texto `--accent-ink`, 52 px de altura. Hover: sobe 2 px e o brilho cresce. **Secundário:** contorno branco 24 %.
- **Moldura do produto (hero):** borda de 1 px, raio 28, barra superior com três pontos e brilho laranja ao fundo. Sem faixa laranja atrás.
- **Hero com foto:** foto de uma atendente (mulher negra, cabelo afro, blazer laranja) olhando o celular, à direita; título, texto e botão à esquerda, sobre o azul-noite. O fundo da foto foi tratado para ficar igual ao `--ink-900` (sem emenda); as bordas esmaecem. O ícone da Heya!Chat faz **uma volta** e pousa no celular, deixando um rastro tracejado laranja (`js/hero.js`, uma vez só, sem loop). A moldura com a tela do chat foi retirada do hero (a tela real aparece na seção Plataforma). Não há mais cartões flutuantes nem logo voando em loop (testado e removido). Foto: confirmar a licença de uso antes de publicar.
- **Fluxo:** linha de 2 px (violeta → laranja) ligando cinco nós numerados; o nó ativo acende.
- **Visualizador de telas (Plataforma):** uma tela grande por vez, na largura do conteúdo, escolhida por abas em pílula (Fila · Relatórios · CRM · Reuniões · Robô; seleção em `--accent`, setas/Home/End no teclado). Acima da tela, título e texto da aba. Clicar na tela (ou no botão "Ampliar") abre uma caixa `<dialog>` com a imagem grande; no celular a imagem abre mais larga que a tela e rola na horizontal. É só ver a imagem: nada dentro da tela reage.
- **Cartão com reação (`.hov`):** todo cartão (números conectados, passos do fluxo, cartões do WhatsApp, perfis, perguntas, pílulas) sobe 3 px, a borda vira laranja 60 %, ganha sombra laranja e um foco de luz que segue o cursor (`js/hover.js`, variáveis `--mx/--my`). Em toque, reage ao `:active`. Usa a propriedade `translate` para não brigar com o `transform` da entrada.
- **Diagrama da central:** à esquerda três cartões de número (Vendas, Suporte, Filial, "Conectado"), no meio três linhas tracejadas animadas que convergem num selo com o logo, e à direita a tela real da fila numa moldura. Abaixo, pílulas "Atendentes · Supervisores · Robô opcional · Painel para TV" e a nota "Números e status de exemplo." No celular os cartões empilham e uma linha vertical liga ao selo e à tela.
- **FAQ, rodapé:** sóbrios, sem ornamento.

## Movimento (descrição; as imagens de conceito não mostram)

Curva `cubic-bezier(.22,1,.36,1)`; 400–700 ms; só `transform` e `opacity`.

1. **Entrada do hero:** título sobe em 3 linhas com atraso de 80 ms; a moldura sobe; o ícone faz a volta e pousa no celular da foto (≈ 2,8 s, uma vez).
3. **Rolagem:** seções revelam com 24 px de subida.
4. **Fluxo:** a linha "se desenha" enquanto a pessoa rola e cada nó acende no seu passo.
5. **Números:** contadores só em dados de exemplo e só uma vez.
6. **`prefers-reduced-motion`:** tudo estático, tudo visível.

## O que evitar

Degradê roxo-azul por hábito, vidro fosco em tudo, tudo centralizado, três cartões iguais em fila, emoji como ícone, selo acima do título, métricas ou depoimentos inventados, dados reais de clientes.

## Imagens e ícones

Telas reais do protótipo (com dados fictícios), **sempre como imagem estática**, são as imagens. Ícones: traço de 1,75 px em SVG, `currentColor`. Sem banco de imagens. Fotos de pessoas só se forem do cliente.

## Interação (cor ao clicar, passar o mouse ou focar)

- **Botão primário:** hover `#FF9442` + sobe 2 px; clique `#E8650A` e escala .98. Texto sempre `--accent-ink`.
- **Botão secundário:** hover com contorno e texto `--accent` e fundo laranja a 10 %.
- **Nav:** hover `--accent`; link da seção atual em `--text`.
- **Chave Sem/Com (seção Problema):** "Sem" ativo em lilás `#B7ABF2` com texto `--accent-ink`; "Com" ativo em `--accent`; inativo `--text-dim`, hover com fundo branco 9 %. Na ilustração, "Sem" usa vermelho de alerta (`#FF6B6B` nos contadores, `#FF9A9A` no texto de etiqueta) e borda tracejada; "Com" usa laranja e verde (`--ok`).
- **Telas da plataforma:** hover sobe 4 px, contorno laranja 50 %, brilho laranja e aparece o botão "Ampliar" (sempre visível em toque).
- **Abas:** hover com fundo branco 9 %; aba ativa em `--accent`.
- **Cartões (`.hov`) e perguntas:** ver Componentes. Nas seções brancas a borda e a sombra do hover usam `--paper-accent`. O resumo da pergunta fica laranja (`--paper-accent`) no hover e quando aberta.
- Foco visível sempre (`outline` laranja de 2 px).

## Seção Problema (branca, com cartões escuros)

Fundo `--paper`. Linhas de ligação `--ink-900`, cartões `--ink-850`, legenda `--paper-ink`. A chave Sem/Com fica numa pílula `--ink-900`. Abaixo de 1100 px a ilustração empilha (celulares em linha, fila embaixo) para a fila não invadir a legenda.
