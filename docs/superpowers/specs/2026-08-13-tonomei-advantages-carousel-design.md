# Carrossel sincronizado da seção "Conheça as Vantagens" (tônomei)

## Contexto

A seção "Conheça as Vantagens" (`more-products-section`, id `tonomei-vantagens`) hoje mostra uma grade estática de 12 `app-card`: 4 imagens (`DAS.webp`, `vitrine.webp`, `vendas.webp`, `curso.webp`) intercaladas com 8 cards de texto (ícone + título + descrição), em 3 colunas x 4 linhas. O pedido foi substituir essa grade por um carrossel: uma imagem grande à esquerda ocupando o espaço de duas colunas, e à direita (uma coluna) um único card de texto que troca automaticamente — cada card do carrossel tem sua própria imagem lateral, que aparece à esquerda quando aquele card fica ativo.

Como só existem 4 imagens dedicadas para 8 cards de texto, o usuário confirmou (durante o brainstorming) que múltiplos cards podem compartilhar a mesma imagem lateral, em vez de exigir imagens novas. O mapeamento por proximidade temática:

| Imagem | Cards de texto associados |
|---|---|
| `DAS.webp` | Emissão e controle DAS · Declaração anual simplificada |
| `vitrine.webp` | Vitrine integrada · Controle de estoque |
| `vendas.webp` | Sistema de vendas integrado · Feiras e eventos |
| `curso.webp` | Trilha do conhecimento · Validação de documentos |

## Escopo

Este trabalho substitui inteiramente a grade de 12 `app-card` atual dentro de `more-products-section.component.html`/`.scss`/`.ts`. Nenhum ícone, copy ou imagem novos são necessários — os 8 textos e as 4 imagens já existentes são reaproveitados. O restante da seção (badge, título, subtítulo, botão "Crie sua Conta Aqui!") permanece inalterado.

## Layout

Um único bloco "hero" dentro do `.section-container` da seção, no lugar da antiga `.features-grid`:

- **Esquerda (2/3 da largura):** a imagem do item ativo, dentro de um contêiner de altura fixa (`object-fit: cover`, cantos arredondados, sombra — mesmo espírito visual dos outros contêineres de mídia da LP, como `.video-frame` da about-section).
- **Direita (1/3 da largura):** um único card (mesmo estilo visual do `app-card` de ícone/título/descrição já usado na seção — ícone + título + descrição), com a mesma altura do contêiner de imagem.
- **Abaixo do bloco:** uma fileira de 8 pontos indicadores (um por card de texto), centralizada.

Em telas estreitas (mesmo breakpoint que a grade atual já usa, `max-width: 620px`), o bloco empilha verticalmente: imagem em cima (largura total), card embaixo.

## Dados e comportamento

Os 8 itens (ícone, título, descrição, imagem, alt da imagem) viram um array tipado no `MoreProductsSectionComponent`, substituindo a lista atual de `<app-card>` no template. Um `signal<number>` guarda o índice ativo (0 a 7).

- **Auto-avanço:** a cada ~4.5s o índice avança para o próximo item, voltando ao 0 depois do último (loop infinito), via `setInterval` iniciado em `afterNextRender` (mesmo padrão já usado no componente para o `IntersectionObserver`) e limpo em `ngOnDestroy`.
- **Pausa no hover:** passar o mouse sobre o bloco pausa o auto-avanço, retomando ao tirar o mouse — mesmo padrão de "pausa no hover" já usado no ticker da hero-section (`animation-play-state: paused` lá; aqui, como o avanço é por JS, pausa/retoma o `setInterval`).
- **Navegação manual:** clicar em um ponto indicador define o índice ativo diretamente e reinicia o timer de auto-avanço (para não trocar de novo logo em seguida).
- **Transição:** ao trocar de item, a imagem da esquerda faz crossfade (opacity) para a nova imagem; o card da direita sai com um leve slide-up + fade e o novo card entra do mesmo jeito (~350ms, easing consistente com o resto da LP). Quando duas trocas consecutivas usam a mesma imagem (ex.: Emissão de controle DAS → Declaração anual simplificada, ambas com `DAS.webp`), o crossfade simplesmente não gera mudança visível — comportamento aceitável, sem tratamento especial.
- **`prefers-reduced-motion`:** o auto-avanço continua funcionando (o conteúdo ainda muda), mas sem a animação de slide/crossfade — a troca é instantânea, mesmo padrão de guarda já usado no restante da página (`window.matchMedia('(prefers-reduced-motion: reduce)')`).

## Fora de escopo

- Criar imagens novas por card (usuário confirmou reaproveitar as 4 existentes).
- Alterar os textos/ícones dos 8 itens já existentes.
- Setas de navegação prev/next (só os pontos indicadores, por simplicidade).
