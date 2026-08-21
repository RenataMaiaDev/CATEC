# Carrossel sincronizado da seção "Conheça as Vantagens" (tônomei) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 12-card grid in the tônomei "Conheça as Vantagens" section with a single hero-style carousel: a large image on the left (2/3 width) synced to one auto-advancing feature card on the right (1/3 width), cycling through all 8 existing feature items.

**Architecture:** All changes live inside the existing `MoreProductsSectionComponent` (`src/app/pages/tonomei/section/more-products-section/`) — no new component is created, since this layout isn't reused anywhere else. The 8 feature items (icon, title, description) and their 4 associated images become a typed array on the component. A `signal<number>` tracks which item is active; a `setInterval` advances it automatically, paused on hover and reset on manual dot-click. The template renders one absolutely-positioned `<img>` per item inside a fixed-height media box (crossfading via `opacity`) and one absolutely-positioned card per item inside a matching-height card box (fading + sliding via `opacity`/`transform`), both keyed to the same active index, plus 8 dot buttons below for manual navigation.

**Tech Stack:** Angular 19 (standalone components, signals, new `@for` control-flow syntax — all already used elsewhere in this component), SCSS.

## Global Constraints

- No test files exist for any component in this codebase (only the Angular CLI's own `src/app/app.component.spec.ts` scaffold) — this project has no per-component unit-test convention. Verification is done by running the dev server (`npm start` from `C:\Users\renat\landing-pages\catec`, already running on `http://localhost:4200`) and visually checking the rendered section — describe exactly what to look for and let the user confirm in the browser, since no automated browser tooling is available in this agent session.
- The repo root is `catec/` (not `landing-pages/`). All paths below are relative to `C:\Users\renat\landing-pages\catec`.
- Image-to-feature mapping (confirmed with the user during brainstorming, only 4 dedicated images exist for 8 text cards):
  | Imagem | Cards |
  |---|---|
  | `img-tonomei/DAS.webp` | Emissão e controle DAS · Declaração anual simplificada |
  | `img-tonomei/vitrine.webp` | Vitrine integrada · Controle de estoque |
  | `img-tonomei/vendas.webp` | Sistema de vendas integrado · Feiras e eventos |
  | `img-tonomei/curso.webp` | Trilha do conhecimento · Validação de documentos |
- Auto-advance interval: ~4.5s (4500ms), looping back to the first item after the last.
- Autoplay pauses on hover over the carousel block, resumes on mouse-leave.
- Clicking a dot jumps straight to that item and restarts the autoplay timer (so it isn't immediately overridden by the next scheduled tick).
- Respect `prefers-reduced-motion: reduce` — content still auto-advances, but the crossfade/slide transitions are skipped (instant swap instead).
- On screens ≤620px (same breakpoint the old grid used to switch to a single column) the carousel stacks vertically: image on top (full width), card below.
- Reuse existing CSS custom properties already used elsewhere in this same file/section (`--accent-tonomei`, `--secondary-catec`, `--text-muted`, `--white`, `--radius-lg`, `--radius-md`, `--shadow-sm`, `--shadow-md`) — do not introduce new ones.
- The section's badge/title/subtitle header and the bottom "Crie sua Conta Aqui!" CTA button are unchanged.
- `CardComponent` (`app-card`) stays a shared component used elsewhere (Catec's hero section) — this plan only stops importing/using it inside `MoreProductsSectionComponent`; the component itself is untouched.

---

## File Structure

- Modify `src/app/pages/tonomei/section/more-products-section/more-products-section.component.ts` — replace the `CardComponent` import + `IntersectionObserver` entrance-animation logic with the 8-item data array, the active-index signal, and the autoplay/pause/goTo methods.
- Modify `src/app/pages/tonomei/section/more-products-section/more-products-section.component.html` — replace the `<app-card>` grid with the media/card carousel markup + dot indicators.
- Modify `src/app/pages/tonomei/section/more-products-section/more-products-section.component.scss` — replace the `.features-grid` block (grid layout, entrance animations, `::ng-deep` card overrides) with new rules for `.advantages-carousel`, `.advantages-media`, `.advantages-card`, `.advantages-dots`.

---

### Task 1: Replace the features grid with the synced image + card carousel

**Files:**
- Modify: `src/app/pages/tonomei/section/more-products-section/more-products-section.component.ts` (full file, shown below)
- Modify: `src/app/pages/tonomei/section/more-products-section/more-products-section.component.html` (full file, shown below)
- Modify: `src/app/pages/tonomei/section/more-products-section/more-products-section.component.scss` (full file, shown below)

**Interfaces:**
- Produces: `MoreProductsSectionComponent.advantages: AdvantageItem[]` (readonly, 8 items, each `{ icon, title, description, image, imageAlt }`), `activeIndex: WritableSignal<number>`, `prefersReducedMotion: boolean`, `goTo(index: number): void`, `pauseAutoplay(): void`, `resumeAutoplay(): void`. Nothing outside this component consumes these — this section isn't reused elsewhere.

- [ ] **Step 1: Replace the component TypeScript file**

Replace the full contents of `src/app/pages/tonomei/section/more-products-section/more-products-section.component.ts`:

```ts
import { afterNextRender, Component, OnDestroy, signal } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';

interface AdvantageItem {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

// The 8 feature cards. Only 4 dedicated images exist, so pairs of
// thematically-related features share the same lateral image.
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: 'receipt_long',
    title: 'Emissão e controle DAS',
    description:
      'Gerenciamos suas guias automaticamente. Sem risco, sem multas, sem atrasos.',
    image: 'img-tonomei/DAS.webp',
    imageAlt: 'Emissão de nota fiscal na plataforma tônomei',
  },
  {
    icon: 'description',
    title: 'Declaração anual simplificada',
    description:
      'Cumpra a DASN-SIMEI direto pela plataforma, sem depender de terceiros.',
    image: 'img-tonomei/DAS.webp',
    imageAlt: 'Emissão de nota fiscal na plataforma tônomei',
  },
  {
    icon: 'storefront',
    title: 'Vitrine integrada',
    description:
      'Aqui você será visto, novos clientes, novos mercados, mais negócios para dentro de sua empresa.',
    image: 'img-tonomei/vitrine.webp',
    imageAlt: 'Vitrine integrada tônomei',
  },
  {
    icon: 'inventory_2',
    title: 'Controle de estoque',
    description:
      'Cadastre seus produtos e serviços e mantenha controle total de seus estoques e prazos de validade.',
    image: 'img-tonomei/vitrine.webp',
    imageAlt: 'Vitrine integrada tônomei',
  },
  {
    icon: 'point_of_sale',
    title: 'Sistema de vendas integrado',
    description:
      'Registre seus pedidos e acompanhe todas as suas vendas em um único lugar, direto pela plataforma.',
    image: 'img-tonomei/vendas.webp',
    imageAlt: 'Sistema de vendas integrado tônomei',
  },
  {
    icon: 'event',
    title: 'Feiras e eventos',
    description:
      'Permite que você tenha acesso as feiras e eventos para vender seus produtos e serviços através de uma reserva simples e descomplicada.',
    image: 'img-tonomei/vendas.webp',
    imageAlt: 'Sistema de vendas integrado tônomei',
  },
  {
    icon: 'school',
    title: 'Trilha do conhecimento',
    description:
      'Aqui, de qualquer lugar, você pode fazer seu curso, seu treinamento e melhorar ainda mais seu negócio.',
    image: 'img-tonomei/curso.webp',
    imageAlt: 'Trilha do conhecimento tônomei',
  },
  {
    icon: 'verified',
    title: 'Validação de documentos',
    description:
      'A ferramenta tônomei analisa e valida seus documentos, ou seja, sua validade, sua origem e demais itens de segurança.',
    image: 'img-tonomei/curso.webp',
    imageAlt: 'Trilha do conhecimento tônomei',
  },
];

const AUTOPLAY_INTERVAL_MS = 4500;

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [TonomeiButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "Conheça as Vantagens" section: synced image + card carousel and sign-up CTA.
export class MoreProductsSectionComponent implements OnDestroy {
  readonly advantages = ADVANTAGES;
  readonly activeIndex = signal(0);

  // Set once on init; drives whether the crossfade/slide transitions run.
  prefersReducedMotion = false;

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      this.prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      this.startAutoplay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // Jumps straight to the given advantage and restarts the autoplay timer,
  // so a manual pick isn't immediately overridden by the next tick.
  goTo(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.timerId !== null) return;
    this.timerId = setInterval(() => {
      this.activeIndex.set((this.activeIndex() + 1) % this.advantages.length);
    }, AUTOPLAY_INTERVAL_MS);
  }

  private stopAutoplay(): void {
    if (this.timerId === null) return;
    clearInterval(this.timerId);
    this.timerId = null;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
```

- [ ] **Step 2: Replace the component template**

Replace the full contents of `src/app/pages/tonomei/section/more-products-section/more-products-section.component.html`:

```html
<section class="more-products-section" id="tonomei-vantagens">
  <div class="section-container text-center">
    <!-- Cabeçalho -->
    <span class="section-badge">Conheça as Vantagens</span>
    <h2 class="section-title">
      Um jeito novo de cuidar de <span class="highlight">você</span> e de
      seu negócio.
    </h2>
    <p class="section-subtitle">
      Conheça algumas das funções que vai ajudar você na sua rotina diária.
      Tudo que precisa num só lugar e que esteja na palma de sua mão de
      forma fácil, intuitiva, moderna e organizada.
    </p>

    <!-- Carrossel: imagem sincronizada (2/3) + card ativo (1/3) -->
    <div
      class="advantages-carousel"
      [class.reduced-motion]="prefersReducedMotion"
      (mouseenter)="pauseAutoplay()"
      (mouseleave)="resumeAutoplay()"
    >
      <div class="advantages-media">
        @for (item of advantages; track $index; let i = $index) {
          <img
            [src]="item.image"
            [alt]="item.imageAlt"
            class="advantages-media-img"
            [class.is-active]="i === activeIndex()"
          />
        }
      </div>

      <div class="advantages-card">
        @for (item of advantages; track $index; let i = $index) {
          <div
            class="advantages-card-item"
            [class.is-active]="i === activeIndex()"
          >
            <div class="icon-wrapper">
              <i class="material-icons card-icon">{{ item.icon }}</i>
            </div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
          </div>
        }
      </div>
    </div>

    <!-- Pontos indicadores -->
    <div class="advantages-dots">
      @for (item of advantages; track $index; let i = $index) {
        <button
          type="button"
          class="advantages-dot"
          [class.is-active]="i === activeIndex()"
          [attr.aria-label]="'Ver ' + item.title"
          (click)="goTo(i)"
        ></button>
      }
    </div>

    <!-- Botão Principal -->
    <div class="more-products-actions">
      <app-tonomei-button
        variant="primary"
        (click)="
          navigateTo('https://tonomei.com.br/app/login-demo')
        "
      >
        Crie sua Conta Aqui!
        <i class="fa-solid fa-arrow-right"></i>
      </app-tonomei-button>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace the component styles**

Replace the full contents of `src/app/pages/tonomei/section/more-products-section/more-products-section.component.scss`:

```scss
.more-products-section {
  width: 100%;
  background: #fffefe;
  padding: 60px 24px 0 24px;
  box-sizing: border-box;
  scroll-margin-top: 80px;

  .section-badge {
    color: var(--accent-tonomei);
  }

  .highlight {
    color: var(--accent-tonomei);
  }

  @media (max-width: 768px) {
    padding: 40px 16px 0 16px;
  }
}

/* CARROSSEL: imagem sincronizada (2/3) + card ativo (1/3) */
.advantages-carousel {
  display: flex;
  gap: 24px;
  align-items: stretch;
  width: 100%;
  max-width: 1000px;
  margin: 40px auto 28px auto;

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 16px;
  }
}

.advantages-media {
  position: relative;
  flex: 2;
  height: 340px;
  border-radius: var(--radius-lg, 16px);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  @media (max-width: 620px) {
    height: 220px;
  }
}

.advantages-media-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.35s ease;

  &.is-active {
    opacity: 1;
    z-index: 1;
  }
}

.advantages-card {
  position: relative;
  flex: 1;
  height: 340px;
  text-align: left;

  @media (max-width: 620px) {
    height: auto;
    min-height: 220px;
  }
}

.advantages-card-item {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 28px 24px;
  background: var(--white, #ffffff);
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 12px);
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    z-index: 1;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background-color: rgba(0, 181, 163, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }

  .card-icon {
    font-size: 1.5rem;
    color: var(--accent-tonomei);
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--secondary-catec);
    margin-bottom: 8px;
  }

  .card-description {
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--text-muted);
  }

  @media (max-width: 620px) {
    padding: 22px 18px;
  }
}

.advantages-carousel.reduced-motion {
  .advantages-media-img,
  .advantages-card-item {
    transition: none;
  }
}

/* PONTOS INDICADORES */
.advantages-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
}

.advantages-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background-color: #cbd5e1;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background-color: rgba(0, 181, 163, 0.5);
  }

  &.is-active {
    background-color: var(--accent-tonomei);
    transform: scale(1.25);
  }
}

.more-products-actions {
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    app-tonomei-button {
      width: 100%;
    }
  }
}
```

- [ ] **Step 4: Verify the dev server compiles with no errors**

The dev server (`npm start`) should already be running on `http://localhost:4200` with HMR/watch enabled from earlier work in this session. Confirm no compile errors appear after saving these three files.

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/tonomei`
Expected: `200`, and no `ERROR`/`Application bundle generation failed` lines in the dev server's most recent output.

- [ ] **Step 5: Visually verify in the browser**

Open `http://localhost:4200/tonomei` in Chrome and scroll to "Conheça as Vantagens" (id `tonomei-vantagens`).

Expected:
- A single row: a large image on the left (~2/3 width) and one white card (icon + bold title + description) on the right (~1/3 width), same height.
- Every ~4.5s, the card fades/slides to the next of the 8 features, and the image crossfades to match (e.g. when the card shows "Vitrine integrada", the image shown is `vitrine.webp`).
- 8 small dots below the carousel; the one matching the current card is filled/teal and slightly larger. Clicking a different dot jumps straight to that card+image and the image/card don't flicker back immediately.
- Hovering anywhere over the image+card row pauses the auto-advance; moving the mouse away resumes it.
- Resize the window to ≤620px wide: the image stacks on top (full width), the card below it, both still legible.
- No stray `<app-card>`-shaped empty grid or leftover spacing where the old 12-card grid used to be.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/tonomei/section/more-products-section/more-products-section.component.ts src/app/pages/tonomei/section/more-products-section/more-products-section.component.html src/app/pages/tonomei/section/more-products-section/more-products-section.component.scss
git commit -m "feat: replace tonomei advantages grid with synced image+card carousel"
```
