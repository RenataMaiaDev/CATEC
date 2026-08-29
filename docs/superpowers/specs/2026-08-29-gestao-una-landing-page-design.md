# Landing page da Gestão Una

## Contexto

O projeto Angular `catec` tem quatro marcas: Catec, tônomei, SISAMB e Gestão Una. As três primeiras têm landing pages construídas; a Gestão Una só tem a pasta escafoldada — rota `/gestao-una` já registrada em `app.routes.ts`, `home.page.ts/.html/.scss` e as seções `hero-section`, `about-section`, `more-products-section` existem como arquivos, mas hero/about estão vazios (0 linhas) e `home.page.html` só tem o `<app-footer theme="gestao">` ligado.

Diferente do SISAMB, a Gestão Una já tem componentes de marca funcionais: `header` (cópia ainda não adaptada do header do Catec — texto/links ainda "CATEC Soluções"), `button` (`app-gestao-button`, variantes primary/secondary/outline) e `card` (`app-card`, ícone + título + descrição + botão opcional). **Porém `button.component.scss` e `card.component.scss` ainda usam as variáveis de cor do Catec** (`var(--primary-catec)`, `.catec-card`, laranja `rgba(242,101,34,...)`) em vez das já existentes `--primary-gestao` (`#00bfa5`, teal) e `--secondary-gestao` (`#181328`, roxo escuro) — precisam ser corrigidos para não vazar a cor do Catec, mesmo bug que já ocorreu com o SISAMB antes.

As cores da marca, o logo (`images/logo-gestao-una.webp`), a imagem de conceito (`images/gestao.webp`) e o tema de rodapé (`FooterTheme = 'gestao'`, com logo/e-mail/WhatsApp já configurados em `footer.component.ts`) já existem no projeto, prontos para uso.

O usuário confirmou que, por enquanto, o conteúdo deve ser genérico: a Gestão Una é descrita como um **sistema de gestão institucional** — sem funcionalidades específicas inventadas. A única descrição real já existente no projeto (usada no carrossel "Soluções em Destaque" da home do Catec) foi usada como base: *"Gestão Una é uma plataforma de integração e centralização de informações, concebida para atuar como um ponto único de acesso a dados que hoje estão espalhados em diversos sistemas independentes, tanto no setor público quanto no privado."*

O card da Gestão Una nesse carrossel do Catec está com `clickable: false` hoje, porque a página não existia. Passa a `true` nesta implementação.

## Estrutura da página

```
<app-header>                    -- adapta o componente já existente (hoje com texto do Catec)
<app-hero-section>               -- popula o arquivo já existente (vazio)
<app-about-section>               -- popula o arquivo já existente (vazio)
<app-more-products-section>       -- reaproveitado para a seção de "Módulos"
<app-footer theme="gestao">        -- já pronto, só ligar (já está ligado)
```

Sem modal de orçamento (isso é específico de Catec/tônomei) — os CTAs abrem o WhatsApp diretamente, mesmo padrão adotado pelo SISAMB. O botão flutuante de WhatsApp global (`src/app/components/whatsapp-button/`, já em `app.component.html`) cobre a rota `/gestao-una` automaticamente com o número já configurado no rodapé (`5585996157126`) — não é necessário o stub `pages/gestao-una/shared/components/whatsapp-button/` (fica sem uso; será removido na implementação por ser scaffolding morto).

## Correção de tema (pré-requisito)

Antes de estilizar as seções novas, `button.component.scss` e `card.component.scss` da Gestão Una trocam as referências de `var(--primary-catec)`/`var(--secondary-catec)`/`.catec-card` por `var(--primary-gestao)`/`var(--secondary-gestao)` (renomeando a classe raiz do card para `.gestao-card` para evitar colisão de estilo com o card do Catec).

## Componentes reaproveitados

- `header` (`pages/gestao-una/shared/components/header/`): mesma estrutura/lógica (sticky, menu mobile), mas texto e links adaptados — logo `images/logo-gestao-una.webp`, sem o dropdown "Links Úteis" (específico do Catec), links por âncora: Início · Sobre · Módulos · Contato.
- `button`/`card`: já existem e serão só corrigidos de cor (ver acima), não recriados.

## Conteúdo por seção

### Header

Nav: Início · Sobre · Módulos · Contato (rolagem por âncora). Logo: `images/logo-gestao-una.webp`.

### Hero

- Título: "Gestão eficiente para todas as suas instituições, **em um só lugar**".
- Subtítulo: "O Gestão Una centraliza e integra dados que hoje estão espalhados em sistemas diferentes, dando à sua instituição — pública ou privada — um ponto único de acesso às informações que importam."
- CTA primário: "Fale Conosco", abre WhatsApp com mensagem pré-preenchida (mesmo padrão `abrirWhatsApp()` das outras marcas sem modal de orçamento).
- 3 cards flutuantes de diferenciais (mesmo padrão do hero do Catec, componente `app-card`): "Dados Centralizados", "Integração de Sistemas", "Gestão Simplificada".
- Imagem: `images/gestao.webp`.

### Sobre

- Selo: "Sobre a Gestão Una".
- Título: "Tecnologia a serviço da **gestão institucional**".
- Parágrafo: a descrição-base do carrossel do Catec, expandida: "O Gestão Una nasceu para resolver um problema comum a instituições públicas e privadas: informações espalhadas em sistemas independentes que não conversam entre si. A plataforma centraliza esses dados em um único ponto de acesso, simplificando a rotina de gestão e dando mais clareza para a tomada de decisão."
- Imagem: `images/gestao.webp` (mesma arte-conceito da hero, reaproveitada).
- 4 cards de diferenciais: Centralização de Dados · Integração de Sistemas · Segurança da Informação · Relatórios e Indicadores.

### Módulos (reaproveitando `more-products-section`)

4 cards genéricos, ícone (Material Icons) + título + descrição curta, sem bullets nem estatísticas (conteúdo v1, sem funcionalidades específicas confirmadas):

1. **Gestão de Processos** — "Centralize o acompanhamento de processos e tarefas em um único ambiente, com visibilidade clara de cada etapa."
2. **Painéis e Relatórios** — "Acompanhe indicadores e gere relatórios para apoiar decisões com dados confiáveis."
3. **Integração de Sistemas** — "Conecte diferentes sistemas e bases de dados da sua instituição em uma única plataforma."
4. **Controle de Acesso** — "Defina perfis e permissões para garantir que cada usuário acesse só o que precisa."

### Rodapé

`<app-footer theme="gestao">` — já incluído no `home.page.html`, sem alterações necessárias.

## Fora de escopo

- Funcionalidades/módulos reais específicos (conteúdo genérico por decisão do usuário; pode ser revisitado quando houver material real, como aconteceu com o SISAMB).
- Formulário de orçamento dedicado (CTA usa WhatsApp).
- Qualquer alteração nas outras três marcas, exceto o campo `clickable` do card da Gestão Una no carrossel da home do Catec.
- Seções adicionais tipo "Como contratar" ou "Segurança" (SISAMB ganhou essas depois, com conteúdo real fornecido pelo usuário) — ficam para uma rodada futura se/quando houver conteúdo real.
