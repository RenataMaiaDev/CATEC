# Redesign da landing page do SISAMB (conteúdo real + Direção A)

## Contexto

A LP do SISAMB já foi construída uma vez (`docs/superpowers/specs/2026-08-15-sisamb-landing-page-design.md` / plano `docs/superpowers/plans/2026-08-15-sisamb-landing-page.md`, já implementado e no ar em `/sisamb`) com uma estrutura enxuta de 5 seções (header, hero, sobre, 3 módulos, 10 recursos) e visual quase idêntico ao do Catec — cards com ícone, mesma tipografia, mesma composição.

O usuário pediu composições diferentes, hovers dinâmicos e carrosséis, com inspiração no Pinterest. Em resposta, três direções visuais foram apresentadas num companheiro visual (mockups no navegador): **A — Living Data** (editorial, linhas de terreno/topografia, serifada, números flutuando como "achados de pesquisa", módulos em carrossel horizontal com tilt no hover, recursos como "constelação" de ícones conectados), **B — Terminal Municipal** (escuro, monoespaçado, "tela ao vivo" de protocolo) e **C — Do Campo ao Arquivo** (jornada do processo como composição, blocos estilo revista). O usuário escolheu a **Direção A**.

Em seguida, o usuário colou o conteúdo real e completo da plataforma SISAMB (site hospedado por outro fornecedor/parceiro, `dulane.com.br`), confirmando que é o conteúdo real do produto e que deve ser usado como base de conteúdo/estrutura para esta LP da CATEC — muito mais rico que o que tínhamos (12 seções contra as 5 atuais, 6 módulos reais em vez de 3 genéricos, seção de dores, de segurança/LGPD, de acesso direto à plataforma, processo comercial de contratação). O usuário confirmou: sem seção de vídeo por enquanto (não tem o vídeo ainda), e a Direção A continua valendo para essa estrutura maior.

**Este documento substitui a spec original como fonte de verdade para o conteúdo e a composição visual.** A implementação anterior (componentes `button`/`card`/`header` específicos do SISAMB, padrão de reveal por `IntersectionObserver`) continua sendo o alicerce técnico — este redesign estende e reestiliza esse alicerce, não descarta o trabalho já feito nele.

## Ajustes de conteúdo em relação ao material colado

- **Contato:** todo contato substituído pelos canais reais da CATEC já configurados no rodapé — e-mail `sisamb.eco@catecsolucoes.com.br`, WhatsApp `(85) 9 9615-7126` (`5585996157126`). O e-mail `contato@dulane.com.br` do material de referência não é usado.
- **Link da plataforma:** `https://sisamb.eco.br/` — já é o link real, confirmado pelo usuário anteriormente e já usado no botão do carrossel da home do Catec.
- **Seção de vídeo:** fora de escopo por enquanto (sem asset disponível). Fica documentada aqui como possível seção futura, mas não é construída nesta rodada.
- **"Ver o sistema em ação" (CTA secundário do hero):** sem vídeo pra abrir, esse botão passa a rolar a página até a seção de Módulos (`#sisamb-modulos`) em vez de abrir um player.

## Estrutura da página (Direção A aplicada)

```
Header (nav atualizado com as novas âncoras)
Hero — headline + stats flutuantes + selos de confiança
Processos Suportados — faixa de tags em carrossel automático (marquee)
O Problema — "Sua secretaria ainda opera assim?" (6 dores, cartões em mural)
A Solução — 6 módulos, grade com hover-reveal (não carrossel — ver nota abaixo)
Por que o SISAMB — 8 benefícios, "constelação" de ícones conectados
Acesso à Plataforma — link direto, tratamento simples/direto
Como Contratar — 4 passos, como uma linha do tempo conectada
Segurança e Confiabilidade — 8 itens de conformidade, lista dupla-coluna
CTA Final — WhatsApp
Footer (já existente, tema sisamb, sem alterações)
```

**Nota sobre carrossel vs. hover-reveal nos módulos:** o material de referência descreve explicitamente "Passe o mouse sobre cada módulo para ver os detalhes" — ou seja, o padrão real de interação dos 6 módulos é *hover-to-reveal*, não arrastar/navegar um carrossel. Para não contrariar esse conteúdo já validado como real, os 6 módulos usam uma grade com revelação no hover (com leve inclinação/escala, no espírito "carrossel" que o usuário pediu, mas sem navegação). O carrossel de verdade (auto-scroll contínuo, arrastável) fica na seção **Processos Suportados**, que no material de referência aparece com a lista duplicada — sinal claro de que ali é pra ser uma faixa em loop infinito (padrão comum de "nuvem de tags"/logos).

## Linguagem visual por seção (Direção A — Living Data)

Paleta e tipografia consolidadas a partir do mockup aprovado:
- Fundo principal: `#f5f3ee` (creme quente) para seções editoriais; branco puro `--white` para seções de conteúdo denso (segurança, acesso).
- Tipografia de destaque: serifada (Georgia ou equivalente — a definir no plano, respeitando `font-family` já carregada no projeto; se nenhuma serifada estiver disponível, o plano deve adicionar uma via Google Fonts, mesmo padrão do "Plus Jakarta Sans" já carregado).
- Textura de fundo: linhas topográficas sutis (`repeating-linear-gradient` diagonal, opacidade baixa) + glow radial na cor `--primary-sisamb-text`, reaproveitando o token acessível já criado no build anterior.
- Números/estatísticas: monoespaçado (`Courier New` ou equivalente), em cartões brancos flutuantes com sombra, como "achados de pesquisa" — não como StatTiles genéricos.

**Hero:** título serifado grande, à esquerda, com o texto normal em `--secondary-sisamb` e a palavra de destaque ("sem burocracia") na cor `--primary-sisamb-text`. Fundo com a textura topográfica. Os 4 números (100% / 5x / 24/7 / +IA) como cartões flutuantes assimétricos (não uma grade 4 colunas simétrica — posições levemente descoladas, como post-its de pesquisa). Selos de confiança (LGPD, implantação rápida, suporte, treinamento) como uma lista horizontal discreta abaixo dos CTAs, não como cards.

**Processos Suportados:** faixa de largura total, fundo levemente distinto (`--bg-light` ou o creme), com os 5 rótulos ("Licenciamento Ambiental", etc.) em cápsulas (pills) deslizando em loop infinito da direita pra esquerda (CSS `@keyframes` translateX, pausa no hover, respeita `prefers-reduced-motion` parando a animação e mostrando a lista estática).

**O Problema:** título editorial + 6 cartões em mural (tamanhos levemente variados — 2 cartões maiores, 4 menores, como um bento grid assimétrico, não uma grade 3×2 uniforme), cada um com um ✕ vermelho/terracota discreto (não o verde da marca — aqui é sobre o problema, a cor de "erro" deve contrastar) e o texto da dor.

**A Solução (6 módulos):** grade 3×2 no desktop (1 coluna no mobile). Cada tile mostra por padrão: ícone + nome do módulo + rótulo curto (ex.: "Portal do Cidadão" / "Autoatendimento online"). No hover (ou tap no mobile), o tile expande revelando a descrição completa, com leve `scale`/`translateY` e troca de fundo para a cor de destaque. Esse é o principal "efeito hover dinâmico" da página.

**Por que o SISAMB (8 benefícios):** ícones conectados por linhas finas (SVG ou `::before`/`::after` com bordas), remetendo a um mapa de rede/ecossistema — não uma grade repetida de cards como a seção de recursos da v1. Cada nó tem o texto do benefício ao lado/abaixo.

**Acesso à Plataforma:** seção mais simples e direta — sem textura pesada, só o endereço `sisamb.eco.br` em destaque tipográfico grande e um botão primário linkando para `https://sisamb.eco.br/` (abre em nova aba).

**Como Contratar (4 passos):** os 4 passos conectados por uma linha pontilhada horizontal (desktop) / vertical (mobile), reaproveitando visualmente a ideia de "jornada" que apareceu na Direção C durante o brainstorming, mas com o tratamento tipográfico serifado da Direção A.

**Segurança e Confiabilidade:** fundo escuro (`--secondary-sisamb`) para contraste com o resto da página majoritariamente clara — os 8 itens em duas colunas, cada um com um ícone de check discreto.

**CTA Final:** mesmo padrão de CTA final que outras marcas já usam (fundo de destaque, botão de WhatsApp grande, texto de reforço "Resposta rápida · Equipe especializada · Sem compromisso").

## Reaproveitamento do que já existe

- `ButtonComponent`/`HeaderComponent` do SISAMB (já construídos): mantidos, mas o botão pode ganhar uma variante visual nova para esse redesign (a decidir no plano — se o Direction A pede um tratamento de botão diferente do atual formato pílula).
- `CardComponent` do SISAMB (já construído): não serve para a maioria das novas seções (que têm composições assimétricas, hover-reveal, faixas em loop), mas pode ainda ser útil pontualmente — a avaliar tarefa a tarefa no plano.
- Token `--primary-sisamb-text` (#00795f, já criado na correção de contraste do build anterior): reaproveitado como a cor de destaque textual em toda a Direção A.
- `FooterComponent` tema `sisamb`: sem alterações.
- O `home.page.ts`/`.html` do SISAMB será reescrito para a nova composição de seções — as seções antigas (`about-section`, `more-products-section` com o conteúdo de 3 módulos, `platform-features-section` com os 10 recursos genéricos) são substituídas por seções novas com o conteúdo real. Decisão de manter os nomes de pasta/arquivo ou criar novas pastas fica para o plano de implementação.

## Fora de escopo

- Seção de vídeo (sem asset disponível).
- Qualquer alteração nas outras três marcas (Catec, tônomei, Gestão UNA) — este redesign é exclusivo do SISAMB.
- Alterar o link `https://sisamb.eco.br/` já usado no carrossel da home do Catec.
- Integração real com a plataforma (login, formulários funcionais) — a LP continua sendo só marketing/apresentação, com o botão "Acessar plataforma" saindo para o domínio externo real.
