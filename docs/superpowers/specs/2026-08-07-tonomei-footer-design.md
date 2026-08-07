# Rodapé minimalista (tônomei, Catec, Gestão UNA)

## Contexto

O projeto Angular `catec` tem quatro landing pages (Catec, tônomei, Gestão UNA, SISAMB), cada uma com seu próprio header (`HeaderComponent` por página) mas nenhuma delas tem rodapé hoje. O pedido original foi criar um rodapé minimalista e fino para a página do tônomei com telefone, e-mail, localização, texto de copyright e links legais, usando a cor do header e incluindo a logo da Catec. Durante o brainstorming, o usuário confirmou que o mesmo rodapé deve ser reaproveitado nas páginas Catec e Gestão UNA (trocando cor/logo/nome da marca, mantendo o mesmo contato), e que a página SISAMB fica de fora por enquanto por ainda não ter header nem seção de contato implementados.

## Componente

Novo `FooterComponent` standalone em `src/app/components/footer/` (mesmo nível hierárquico do `WhatsappButtonComponent` já existente em `src/app/components/whatsapp-button/`), reutilizado pelas três páginas.

**Input:**
- `theme: 'tonomei' | 'catec' | 'gestao'` — controla a cor de fundo (mesma cor do header daquela página) e o nome da marca exibido no texto de copyright.

## Conteúdo e layout

Uma única faixa fina, sem colunas largas, dividida em duas linhas:

1. **Linha de contato:** logo branca da Catec (`public/img/logo-catec-solucoes1.png`, versão já preparada para fundo escuro) à esquerda; à direita/centro, três itens com ícone Font Awesome (mesmo padrão já usado no header e no `whatsapp-button`):
   - `fa-brands fa-whatsapp` + "(85) 9 9804-9463" — link clicável para `https://api.whatsapp.com/send/?phone=5585998049463&text=...` (mesmo padrão do `WhatsappButtonComponent`).
   - `fa-solid fa-envelope` + "tonomei@catecsolucoes.com.br" — link `mailto:`.
   - `fa-solid fa-location-dot` + "Ceará, Brasil" — texto, sem link.
2. **Divisória fina** (`border-top: 1px solid rgba(255,255,255,.08)`).
3. **Linha final:** texto de copyright `© 2026 {marca} · Todos os direitos reservados.` (com sufixo `· Gestão UNA` apenas na página do tônomei) e links "Termos de Uso" / "Privacidade" — placeholders (`href="#"`, `(click)="$event.preventDefault()"`) até existirem páginas reais.

Em telas estreitas, os itens quebram linha e ficam centralizados.

## Cores por página (= cor do header daquela página)

| Página | Variável CSS | Nome exibido no copyright |
|---|---|---|
| tônomei | `var(--primary-tonomei)` (#110627) | `tônomei · Gestão UNA` |
| Catec | `var(--secondary-catec)` (#1e293b) | `CATEC Soluções` |
| Gestão UNA | `var(--secondary-catec)` (#1e293b, mesma cor do header atual dela) | `Gestão UNA` |

Telefone, e-mail e localização são idênticos nas três páginas — só mudam cor de fundo e nome da marca no copyright. A logo exibida é sempre a da Catec (empresa mãe das três marcas).

## Integração

- `src/app/pages/tonomei/home/home.page.html` → `<app-footer theme="tonomei">` no fim, após `<app-more-products-section>`.
- `src/app/pages/catec/home/home.page.html` → `<app-footer theme="catec">` no fim.
- `src/app/pages/gestao-una/home/home.page.html` → `<app-footer theme="gestao">`. Confirmado: essa home hoje só tem um comentário HTML, sem nenhuma seção montada (`home.page.ts` não importa nenhum componente). O rodapé será adicionado do mesmo jeito, sozinho na página, sem tentar completar as seções que faltam — isso está fora do escopo deste pedido.
- SISAMB: fora de escopo por enquanto.

## Fora de escopo

- Criar as páginas reais de "Termos de Uso" e "Privacidade".
- Completar a landing page do SISAMB.
- Alterar conteúdo/telefone/e-mail específicos por marca (usuário confirmou reaproveitar o mesmo contato).
