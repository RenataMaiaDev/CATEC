# Landing page do SISAMB

## Contexto

O projeto Angular `catec` já tem quatro marcas: Catec, tônomei, Gestão UNA e SISAMB. As três primeiras têm landing pages construídas (ao menos parcialmente); o SISAMB só tem a pasta escafoldada — `home.page.ts`/`.html`/`.scss` e três seções (`hero-section`, `about-section`, `more-products-section`) existem como arquivos, mas todos vazios (0 linhas de HTML/SCSS). Não existe header próprio, botão, nem card para essa marca. As cores da marca (`--primary-sisamb: #00c29d`, `--secondary-sisamb: #2a2f35`, `--bg-dark-sisamb`) e o tema de rodapé (`FooterTheme = 'sisamb'`, com logo/e-mail/WhatsApp já configurados em `footer.component.ts`) já existem no projeto, prontos para uso.

O usuário confirmou que a LP deve seguir a mesma estrutura macro das outras marcas (header próprio + hero + seção sobre + seção de serviços/produtos + rodapé compartilhado) e forneceu o conteúdo real do sistema (funcionalidades, módulos, objetivos) em texto corrido, que foi organizado nesta spec. Nenhuma funcionalidade foi inventada — tudo aqui vem do texto fornecido pelo usuário.

O botão "Experimente o SISAMB" no carrossel "Soluções em Destaque" da home do Catec (`tonomei-section.component.ts`) já aponta para a rota interna `/sisamb`, que esta spec descreve.

## Estrutura da página

```
<app-header>                    -- novo componente, específico da marca
<app-hero-section>               -- popula o arquivo já existente (vazio)
<app-about-section>               -- popula o arquivo já existente (vazio)
<app-modules-section>             -- reaproveita/renomeia o more-products-section existente
<app-platform-features-section>   -- seção nova (não existe pasta ainda)
<app-footer theme="sisamb">        -- já pronto, só ligar
```

Decisão: o arquivo `more-products-section` existente (vazio) será reaproveitado para a seção de **Módulos**, já que seu propósito original — mostrar produtos/serviços em destaque — é exatamente o que os 3 cards de módulo fazem. A seção de **Recursos da plataforma** (grade de ícones) é conteúdo novo sem arquivo correspondente hoje, então cria uma pasta nova `section/platform-features-section`.

## Componentes novos (específicos da marca SISAMB, seguindo o padrão já usado por Gestão UNA)

Assim como cada marca (Catec, tônomei, Gestão UNA) tem seu próprio `header`/`button`/`card` com cores fixas via CSS var (`var(--primary-catec)`, etc. — não são componentes "genéricos" parametrizáveis por tema), o SISAMB precisa dos seus:

- `src/app/pages/sisamb/shared/components/header/` — novo. Nav sticky, links por âncora (mesmo padrão de `setActiveSection`/scroll-spy do header do tônomei/gestão), menu hambúrguer mobile. Sem dropdown "Links Úteis" (isso é específico do Catec).
- `src/app/pages/sisamb/shared/components/button/` — novo. Variant `primary`/`outline`, cores em `var(--primary-sisamb)`.
- `src/app/pages/sisamb/shared/components/card/` — novo. Usado nos cards de diferenciais (seção Sobre) e nos cards de módulo. Ícone (Material Icons) + título + descrição, no mesmo formato do `app-card` do Catec.

Não é necessário um `whatsapp-button` específico do SISAMB: o botão flutuante global (`src/app/components/whatsapp-button/`) já usa o número padrão (`5585996157126`, o mesmo do rodapé do SISAMB) para qualquer rota que não seja `/tonomei` — funciona automaticamente em `/sisamb` sem alteração.

## Conteúdo por seção

### Header

Nav: Início · Sobre · Módulos · Recursos · (mesmo padrão de scroll-spy com `activeSection()` das outras marcas). Logo: `img/logo-sisamb.webp`.

### Hero

- Título: "Gestão ambiental pública, simplificada e **100% digital**" (destaque em "100% digital").
- Subtítulo: "O SISAMB leva a gestão ambiental do seu município, estado ou consórcio para o digital: menos deslocamentos, mais transparência e processos automatizados com inteligência artificial, do protocolo à emissão da licença."
- CTA primário: "Fale Conosco", abre WhatsApp com mensagem pré-preenchida (mesmo padrão `abrirWhatsApp()` usado no hero do Catec — sem modal de orçamento, já que o SISAMB é B2G e ainda não tem fluxo de orçamento próprio).
- 3 cards flutuantes de diferenciais (mesmo padrão do hero do Catec): "100% Digital" (elimina deslocamento presencial), "IA em cada etapa" (chatbot e análise automática de documentos), "Transparência total" (rastreabilidade de processos).
- Imagem: `img/sisamb.webp` (arte-conceito já existente no projeto, hoje usada no carrossel do Catec — reaproveitada aqui também).

### Sobre

- Selo: "Sobre o SISAMB".
- Título: "Tecnologia a serviço da **gestão ambiental pública**".
- Parágrafo: "O SISAMB nasceu para simplificar os processos e fluxos de trabalho da gestão ambiental pública, tornando-os mais intuitivos e acessíveis tanto para o cidadão quanto para o servidor. Ao eliminar a necessidade de deslocamentos presenciais e automatizar tarefas repetitivas, a plataforma reduz tempo e custos, aumenta a transparência das decisões e libera as equipes técnicas para o que realmente importa: fiscalização e gestão de qualidade."
- Imagem: `img/sisamb.webp` (mesma arte-conceito da hero — reaproveitada, sem badge de "Desde XXXX" como o Catec tem, já que não há data de fundação a destacar; badge flutuante alternativo: ícone + "100% Online").
- 4 cards de diferenciais: Processos Simplificados · Menos Tempo, Menos Custo · Transparência e Rastreabilidade · Integração Governamental (interoperabilidade seguro com outras bases públicas).

### Módulos (reaproveitando `more-products-section`)

3 cards, cada um com descrição + lista de bullets (mesmo padrão de `<ul>` usado nos planos do tônomei):

1. **Atendimento ao Cidadão** — "Chatbot com inteligência artificial que orienta o cidadão em cada etapa, reduz dúvidas e facilita o preenchimento correto das solicitações — com linguagem simples e feedback imediato." Bullets: Formulários online · IA para análise e verificação de documentos · Acompanhamento de processos na própria plataforma · Central de notificações.
2. **Gestão de Processos** — "Ferramentas para o gestor distribuir tarefas, acompanhar prazos e homologar processos com clareza em cada etapa." Bullets: Distribuição de tarefas pelo gestor · Acompanhamento e gestão de prazos · Visualização dos documentos após triagem · Homologação (aprovação/rejeição).
3. **Cursos & Treinamentos** — card mais enxuto, sem lista de bullets (o usuário confirmou que o checklist interno de planejamento de curso não aparece no site, e não há outras sub-funcionalidades públicas desse módulo hoje). Descrição: "Módulo dedicado à capacitação contínua dos agentes envolvidos, direto na plataforma."

### Recursos da plataforma (`platform-features-section`, novo)

Grade de ícone + rótulo curto (mesmo padrão visual dos cards diferenciais do hero), com 10 dos ~18 recursos citados pelo usuário, selecionados por serem os mais fortes/diferenciadores para uma landing page:

1. Inteligência Artificial em cada etapa
2. Histórico de processos em nuvem
3. Relatórios on-line e em PDF
4. Notificações automáticas por prazo
5. Assinatura eletrônica para todos os usuários
6. Dashboard com painéis analíticos e sintéticos
7. Acesso e procedimentos disponíveis offline
8. Emissão de licenças direto na plataforma
9. Cadastro unificado dos agentes envolvidos
10. Leis atualizadas e resumidas para fácil compreensão

Os ~8 recursos não selecionados (protocolo de acompanhamento, guias de pagamento, acompanhamento "just-in-time" de objetos em trânsito, múltiplos tipos de usuário, filtros de análise, convênios com outros órgãos) ficam de fora da v1 da landing page — podem ser revisitados depois se o usuário quiser expandir a seção.

### Rodapé

`<app-footer theme="sisamb">` — já totalmente pronto (logo, e-mail `sisamb.eco@catecsolucoes.com.br`, WhatsApp `(85) 9 9615-7126`), só precisa ser incluído no `home.page.html`.

## Fora de escopo

- Módulo de Atendimento ao Cidadão e Gestão de Processos como páginas/telas reais (a LP só descreve, não implementa o sistema em si).
- Formulário de orçamento/contato dedicado (o CTA usa WhatsApp, como o Catec faz hoje).
- Os 8 recursos de plataforma não selecionados para a grade (listados acima).
- Alterar o link externo `https://sisamb.eco.br/` usado em outros lugares do site (ex.: o botão do carrossel do Catec já foi trocado para a rota interna `/sisamb` à parte deste trabalho).
