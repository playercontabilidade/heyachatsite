# 01 · Mapa da página e copy (pt-BR)

A copy abaixo é a **versão atual** (revisão 2, com títulos reescritos) e é **final**: copie literalmente. Os blocos 6 a 8 reaproveitam o texto da versão 1 (`reference/v1-index.html`, seções `#whatsapp`, `#perfis`, `#organizacoes`, `#faq`), **sem** qualquer menção a demonstração, checklist ou processo ágil. Fonte do produto: `reference/especificacao_sistema_atendimento.pdf`.

Fundo: **alternam azul-noite (`--ink-900`) e branco (`--paper`) em corte reto**, sem degradê entre seções e sem seção laranja. Brancas: Problema, Fluxo, WhatsApp, Perguntas. Azuis: Hero, Central, Plataforma, Perfis, CTA final e rodapé (`DESIGN.md`, "Alternância azul / branco").

| # | Seção | `id` | Referência visual |
|---|---|---|---|
| 0 | Header | — | `design/01-hero.png` |
| 1 | Hero | `inicio` | `design/01-hero.png` |
| 2 | Problema → fila | `visao` | `design/02-problema.png` |
| 3 | A central (diagrama) | `central` | `design/03b-central.png` |
| 4 | Caminho de uma conversa | `fluxo` | `design/03-fluxo.png` |
| 5 | Plataforma (abas + tela grande) | `plataforma`, `telas` | `design/04-plataforma.png` |
| 6 | WhatsApp oficial | `whatsapp` | `design/00-pagina-inteira.png` |
| 7 | Perfis e organizações | `perfis` | `design/00-pagina-inteira.png` |
| 8 | Perguntas frequentes | `faq` | `design/00-pagina-inteira.png` |
| 9 | CTA final | `contato` | `design/05-final.png` |
| 10 | Rodapé | — | `design/05-final.png` |

Nav do header: **Atendimento · WhatsApp · CRM · Robô · Relatórios · Perguntas**. À direita: botão **Entrar** (laranja). No menu mobile: **Entrar na plataforma**.
Âncoras da nav: Atendimento → `#atendimento`, CRM → `#crm`, Robô → `#robo`, Relatórios → `#painel` (os quatro **abrem a aba correspondente** do visualizador e rolam até ele; `js/viewer.js`), WhatsApp → `#whatsapp`, Perguntas → `#faq`. A aba Reuniões responde a `#reunioes`.

## Botões e links (regra única)

- Um só tipo de ação: **Entrar** / **Entrar na plataforma** → `https://app.heyachat.com.br`. Não existe "Falar com a equipe", WhatsApp de contato nem agendamento. A seção final mantém `id="contato"` só como âncora.
- Nenhum botão fala em demonstração, teste ou "ver funcionando".
- **Cores ao interagir:** primário clareia (`#FF9442`) no hover e escurece (`#E8650A`) no clique; secundário ganha contorno e texto laranja com fundo laranja 10 %; links da nav ficam laranja no hover; resumo das perguntas fica laranja no hover e quando aberto; todos os cartões ganham borda laranja, elevação e foco de luz no hover; a chave Sem/Com usa lilás (`#B7ABF2`) no "Sem" e laranja no "Com".

## 0 · Header
Logo `images/logo-mark.png` + texto **HEYA!CHAT** (Manrope 800, o "!" em `--accent`), link para `#inicio`. Nav centralizada à direita, botão primário pequeno (46 px). Em ≤ 900 px: botão de menu que abre painel em tela cheia, foco preso, `Esc` fecha.

## 1 · Hero (`inicio`)
- h1: **Nenhuma conversa se perde.** ("se perde." em `--accent`; quebra: "Nenhuma / conversa se perde.")
- Lede: *Todos os números de WhatsApp da empresa numa central só. Fila, equipe, CRM e relatórios, com o histórico na conta da empresa, não no celular de alguém.*
- Botão único: **Entrar na plataforma** (primário, com seta).
- Linha de provas, 3 itens com ponto laranja: *Vários números do WhatsApp · Equipe, CRM e relatórios no mesmo lugar · Modelos oficiais de mensagem* (evitar repetir "conexão oficial", "fila única" e "histórico", que já aparecem no restante da página).
- Produto: moldura com `images/tela-chat.webp` (alt: "Tela de conversas do Heya!Chat com lista de conversas à esquerda e mensagens à direita. Dados de exemplo."), brilho laranja no topo, grade de pontos no fundo do topo. Sem faixa laranja atrás.
- **Foto** `images/hero-mulher.webp` (atendente com blazer laranja olhando o celular) à direita do título; o ícone do logo faz uma volta e pousa no celular, com rastro tracejado laranja (`js/hero.js`, uma vez; com movimento reduzido já aparece pronto). A moldura do chat foi retirada do hero. Em ≤ 900 px: texto primeiro e depois a foto recortada na atendente.

## 2 · Problema → fila (`visao`)
- kicker: **O problema**
- h2: **A conversa mora no celular de alguém. Quando essa pessoa sai, ela vai junto.**
- Texto: *Com a Heya!Chat, o número é da empresa, a fila é do time e o histórico fica na conta. Quem atende pode mudar. O fio continua.*
- **Fundo branco** (`--paper`) com cartões escuros; sem laranja de seção. Kicker em `--paper-accent`, linhas de ligação em `--ink-900`, legenda em `--paper-ink`. Abaixo de 1100 px a ilustração empilha.
- **Chave "Sem o Heya!Chat / Com o Heya!Chat"** (dois botões, `aria-pressed`, `js/switch.js`), acima da ilustração. Padrão: **Com**. A legenda abaixo troca e é `aria-live="polite"`:
  - Com: *Todos os números na mesma fila. O histórico fica com a empresa.*
  - Sem: *Cada número num celular, cada histórico com uma pessoa.*
- **Com:** três cartões "celular" (Vendas · celular do Marcos · 3; Suporte · celular da Ana · 1; Filial · celular do Paulo · 5) ligados por linhas tracejadas ao cartão **Fila única · ao vivo** com 4 linhas: Carolina Dias (Vendas · há 2 min · Nova), João Matos (Suporte · há 8 min · Nova), Renato Alves (Filial · em atendimento · Atendendo), Ana Beatriz (Vendas · resolvida · Resolvida).
- **Sem:** as linhas somem, os cartões se espalham e giram um pouco, os contadores ficam vermelhos (`#FF6B6B`) e a fila é trocada por um cartão de borda tracejada **Sem fila única · ninguém vê o todo** com 3 linhas (Vendas / Suporte / Filial · "no celular do …" · etiqueta **Sem acesso**) e a nota *Se o Marcos sair, o histórico sai junto.* Troca com `opacity`/`transform`.
- É só ilustração: a chave não simula o app. Dados fictícios.
- Em ≤ 900 px: o painel do estado ativo aparece abaixo dos três cartões, sem linhas.

## 4 · Caminho de uma conversa (`fluxo`)
- kicker: **O caminho de uma conversa** · h2: **Do primeiro oi ao fechamento, sem ponto cego.**
- Fundo branco. Cada passo é um **cartão** branco com borda `--paper-line` e reação ao passar o mouse. Linha violeta→laranja ligando os 5 círculos numerados, visível nos vãos entre os cartões; o passo 3 vem aceso (laranja) por padrão e, com a rolagem, cada passo acende no seu momento.

| # | Título | Texto | Mini cartão (estático) |
|---|---|---|---|
| 1 | Chega | Por qualquer um dos números da empresa, pela conexão oficial. | balão "Preciso de ajuda com a nota fiscal" |
| 2 | Entra na fila | Status, prioridade e tempo de espera à vista de todos. | Carolina Dias · etiqueta Nova · Loja Central · há 2 min |
| 3 | Alguém assume | Aceita, recusa ou transfere para outra pessoa ou departamento. | botões Recusar / Aceitar (visuais, sem ação) |
| 4 | Atende | Texto, áudio, arquivo e comentário interno, no mesmo fio. | chips: Comentário interno · PDF · Transferir |
| 5 | Fecha | Resolvida, vira lead no CRM e entra nos relatórios. | etiqueta Resolvida · "lead criado" |

Os mini cartões são ilustração: não são botões, não recebem foco (`aria-hidden="true"` nos botões desenhados) e não executam nada.
Mobile: coluna única, linha vertical à esquerda.

## 5 · Plataforma (`plataforma`)
- kicker: **A plataforma** · h2: **Fila, CRM e reunião na mesma tela do atendente.** · nota à direita: *Telas reais do sistema. Dados de exemplo.*
- **Uma tela grande por vez**, na largura do conteúdo (1200 px no desktop), escolhida por **abas em pílula**: Fila · Relatórios · CRM · Reuniões · Robô (`role="tablist"`, setas/Home/End, `js/viewer.js`). Padrão: Fila. Acima da tela, título (esquerda) e texto (direita) da aba ativa. A tela fica solta (sem cartão atrás, sem degradê), cantos de 16 px, sombra suave. **Clicar na tela abre a ampliação** (`<dialog>`, `Esc` ou clique fora fecham, foco volta ao botão). No celular a tela aparece recortada e ampliada e a ampliação abre mais larga que a tela, com rolagem horizontal. Botão "Ampliar" com lupa aparece no hover (sempre visível em toque).
- É só escolher e ver a imagem estática: nada dentro da tela reage.

| Aba | id do link | h3 | Texto | Imagem |
|---|---|---|---|---|
| Fila | `atendimento` | Quem espera, há quanto tempo, com quem. | Mensagens novas e transferências chegando. O atendente aceita ou recusa. | `tela-fila.webp` |
| Relatórios | `painel` | Quem atendeu quanto, e em quanto tempo. | Atendimentos recebidos, primeira resposta, resolução, ranking e fila em tempo real. | `tela-relatorios.webp` |
| CRM | `crm` | O funil acompanha a conversa. | Lead, em conversa, proposta, fechado. | `tela-crm.webp` |
| Reuniões | `reunioes` | A chamada sem sair do atendimento. | Agenda e sala de vídeo. | `tela-calendario.webp` |
| Robô | `robo` | Atende até a hora de chamar uma pessoa. | Módulo opcional. Fluxo visual com nós e ligações e transferência para atendimento humano. | fluxo em HTML (abaixo) |

- Fluxo do Robô: 4 nós ligados por linha violeta→laranja: **Início → Saudação → Menu** (Financeiro · Entregas · Grupos) **→ Atendente** (transferido, com contorno laranja), num painel de borda tracejada. Estático. No celular os nós ficam em coluna.
- Imagens com `width`/`height`, `loading="lazy"`.

## 6 · WhatsApp oficial (`whatsapp`)
 Copie de `reference/v1-index.html#whatsapp` **só o conteúdo, sem o interruptor QR ↔ API**:
- kicker: **WhatsApp** · h2: **Quem sai da empresa não leva o WhatsApp.** (texto de apoio: *O número é da empresa. Para abrir conversa no WhatsApp oficial, o time usa um modelo aprovado, e o cliente recebe pelo número da empresa.*)
- Mostre a **API oficial da Meta** como destaque (lista de 5 itens da v1) e, em cartão menor ao lado, "Dois modos de conexão, um por organização" com a frase *Os modos são mutuamente exclusivos dentro da mesma organização.* O modo QR code aparece apenas nessa frase, sem lista própria (pergunta em aberto do dono; ver desvios).

## 7 · Perfis e organizações (`perfis`)
Grade de cartões com reação ao passar o mouse (sem abas, sem seletor):
- kicker **Perfis de acesso** · h2 **Atendente atende. Supervisor enxerga o time.**
- 5 cartões (Cliente, Atendente, Supervisor, Coordenador, Painel; Super admin foi retirado a pedido do dono), em 3 colunas na primeira linha e 2 largas na segunda, com a descrição literal da v1, mais a nota *Robô só aparece se o módulo estiver ativo na organização.*
- Faixa abaixo: kicker **Administração** · h3 **Várias organizações. Módulos sob medida.** com a lista da v1 em duas colunas e a linha **Do seu jeito**: tema claro ou escuro, foto, cores das bolhas e do texto, cor ou imagem de fundo.
- Não incluir o liga/desliga de módulos.

## 8 · Perguntas frequentes (`faq`)
h2: **O que costumam perguntar antes de começar.** 7 perguntas da v1 (`#faq`), literais, cada uma num cartão, em `<details>/<summary>` (sem JS obrigatório). Primeira aberta no desktop. Seta que gira com `transform`.

## 9 · CTA final (`contato`)
- h2: **Nenhuma conversa / fica no celular / de alguém.** (até 92 px, três linhas) · texto: *Entre com a sua conta para abrir a central.*
- Botão único: **Entrar na plataforma** (primário, seta).
- Brilho laranja atrás do título, contido na seção (sem corte seco). Abaixo, faixa com 4 benefícios.

## 10 · Rodapé
Logo + HEYA!CHAT à esquerda, *Vários números. Uma central.* ao centro, *© 2026 HEYA!CHAT* à direita. Sem links inventados.

## Metadados
- `<title>`: Heya!Chat · Vários números. Uma central.
- `<meta name="description">`: Central de atendimento e CRM para WhatsApp: fila única, equipe, relatórios e histórico na conta da empresa.
- `lang="pt-BR"`, Open Graph com o mesmo texto, `theme-color` `#05070D`. Favicon: `images/logo-mark.png`.

## 3 · A central (`central`, entre o Problema e o Fluxo)
- kicker: **A central** · h2: **Três números, uma só fila.** · texto: *Cada número da empresa se liga à Heya!Chat pela conexão oficial. Dali, as conversas caem na mesma fila, com status, prioridade e tempo de espera.*
- Diagrama horizontal: três cartões de número (**Vendas** +55 11 90000-1200 · **Suporte** +55 11 90000-3400 · **Filial** +55 21 90000-2100, todos "Conectado") → três linhas tracejadas animadas que convergem num selo com o logo → moldura com a tela real da fila (`tela-fila.webp`, clicável para ampliar). Abaixo, pílulas *Atendentes · Supervisores · Robô opcional · Painel para TV* e a nota *Números e status de exemplo.* (`.dg-note`).
- Celular: cartões empilhados, linha vertical tracejada com o selo e a tela recortada.
