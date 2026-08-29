# Gestão Una Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first working version of the Gestão Una landing page (`/gestao-una` in the `catec` Angular app) — header, hero, about, and modules sections — with generic institution-management-system content, matching the macro structure and visual language already used by the Catec brand.

**Architecture:** Standalone Angular components, one per section, assembled by `home.page.html`. All new markup/styles reuse the brand's already-existing `--primary-gestao`/`--secondary-gestao` design tokens and the global `.section-badge--gestao`/`.section-title--gestao`/`.section-subtitle--gestao` modifier classes already defined in `src/styles.scss`. No new npm dependencies.

**Tech Stack:** Angular 19 (standalone components, `@if`/`@for` control flow), SCSS, Material Icons (`material-design-icons-iconfont`, already imported globally), Font Awesome (already loaded, used for the header hamburger/WhatsApp icons elsewhere).

**Spec:** `docs/superpowers/specs/2026-08-29-gestao-una-landing-page-design.md`

## Global Constraints

- Content is intentionally generic (Gestão Una described as an institution management system) — do not invent specific features, modules, or statistics beyond what's listed in the spec.
- No orçamento (quote) modal — CTAs open WhatsApp directly (number `5585996157126`, same one already configured in `footer.component.ts` for the `gestao` theme).
- Reuse the existing `--primary-gestao` (`#00bfa5`), `--secondary-gestao` (`#181328`) tokens and the existing `.section-badge--gestao` / `.section-title--gestao` / `.section-subtitle--gestao` classes from `src/styles.scss` — do not add new brand tokens.
- **Testing convention for this codebase:** only `app.component.spec.ts` exists project-wide; individual section/page components have no Jasmine specs (confirmed by scanning `src/app/pages/**`). Follow that established convention — do not add `.spec.ts` files for the new sections. Each task's "test" step is `ng build` (or the running `ng serve` dev server) succeeding with no compile errors, plus a visual check in the browser against the spec.

---

### Task 1: Fix the Gestão Una button/card theme colors

**Files:**
- Modify: `src/app/pages/gestao-una/shared/components/button/button.component.scss`
- Modify: `src/app/pages/gestao-una/shared/components/card/card.component.html`
- Modify: `src/app/pages/gestao-una/shared/components/card/card.component.scss`

**Interfaces:**
- Consumes: nothing (isolated color fix).
- Produces: `app-gestao-button` (selector, unchanged) rendering in `--primary-gestao`/`--secondary-gestao` colors; `app-card` (selector, unchanged) rendering with a `.gestao-card` root class instead of `.catec-card`. Later tasks (3, 4, 5) rely on `<app-card icon=".." title=".." description="..">` and `<app-gestao-button variant="primary|secondary|outline">` rendering in the brand's teal/purple, not Catec's orange.

Both files today are unmodified copies of the Catec components — they still reference `var(--primary-catec)` / `var(--secondary-catec)` / the `.catec-card` class, so anything already using them renders in Catec's orange. Fix that here, before any new section uses them.

- [ ] **Step 1: Rewrite `button.component.scss`**

```scss
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 50px; // Fully rounded pill-shaped buttons
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &.primary {
    background-color: var(--primary-gestao);
    color: var(--white);

    &:hover {
      background-color: var(--primary-hover-gestao);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background-color: var(--secondary-gestao);
    color: var(--white);

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }

  &.outline {
    background-color: transparent;
    border-color: #e2e8f0;
    color: var(--secondary-gestao);

    &:hover {
      border-color: var(--primary-gestao);
      color: var(--primary-gestao);
    }
  }
}
```

- [ ] **Step 2: Rewrite `card.component.html`** (renames the root class from `.catec-card` to `.gestao-card`)

```html
<div class="gestao-card">
  <div class="card-content">
    @if (icon()) {
      <div class="icon-wrapper">
        <span class="material-icons card-icon">{{ icon() }}</span>
      </div>
    }
    <h3 class="card-title">{{ title() }}</h3>
    <p class="card-description">{{ description() }}</p>
  </div>

  @if (showButton()) {
    <div class="card-action">
      <app-gestao-button [variant]="buttonVariant()" (click)="onButtonClick()">
        {{ buttonText() }} <i class="fa-solid fa-arrow-right"></i>
      </app-gestao-button>
    </div>
  }
</div>
```

- [ ] **Step 3: Rewrite `card.component.scss`** (renames `.catec-card` to `.gestao-card`, swaps Catec orange for Gestão Una teal)

```scss
.gestao-card {
  background: var(--white);
  padding: 36px 28px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-align: center;
  border: 1px solid #b0b1b45e;

  // Ensures perfect alignment and equal height inside grids
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon-wrapper {
    width: 64px;
    height: 64px;
    background-color: rgba(0, 191, 165, 0.12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px auto;
  }

  .card-icon {
    font-size: 2rem;
    color: var(--primary-gestao);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--secondary-gestao);
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* Button area at the bottom of the card */
  .card-action {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    width: 100%;

    app-gestao-button {
      display: block;
      width: 100%;
    }
  }
}
```

- [ ] **Step 4: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds with no errors (nothing references `app-card`/`app-gestao-button` yet, so there's no visual check possible until Task 3, but the build must be clean).

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/shared/components/button/button.component.scss src/app/pages/gestao-una/shared/components/card/card.component.html src/app/pages/gestao-una/shared/components/card/card.component.scss
git commit -m "fix: theme Gestão Una button/card with the brand's own colors instead of Catec's"
```

---

### Task 2: Adapt the Gestão Una header

**Files:**
- Modify: `src/app/pages/gestao-una/shared/components/header/header.component.html`
- Modify: `src/app/pages/gestao-una/shared/components/header/header.component.scss`
- Modify: `src/app/pages/gestao-una/shared/components/header/header.component.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `<app-header>` rendering the Gestão Una logo/nav instead of Catec's copied content. Task 6 (`home.page.html`) consumes `<app-header>` as-is (no inputs/outputs).

The file is currently an unmodified copy of Catec's header (CATEC logo, "Links Úteis" dropdown, Catec orange). Adapt content and drop the dropdown — the other single-product brands (tônomei, SISAMB) don't have one either, it's Catec-specific.

- [ ] **Step 1: Rewrite `header.component.html`**

```html
<header class="header" [class.menu-open]="isMenuOpen()">
  <div class="header-container">
    <!-- Logo -->
    <a href="#gestao-inicio" class="logo" (click)="closeMenu()">
      <img src="images/logo-gestao-una.webp" alt="Gestão Una" class="logo-img">
    </a>

    <!-- Desktop navigation menu -->
    <nav class="nav-menu">
      <a href="#gestao-inicio" class="nav-link active">INÍCIO</a>
      <a href="#gestao-sobre" class="nav-link">SOBRE</a>
      <a href="#gestao-modulos" class="nav-link">MÓDULOS</a>
    </nav>

    <!-- Mobile hamburger button -->
    <button class="hamburger-btn" (click)="toggleMenu()" aria-label="Menu de navegação">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Expanded mobile menu -->
    <div class="mobile-menu">
      <nav class="mobile-nav">
        <a href="#gestao-inicio" class="mobile-link" (click)="closeMenu()">INÍCIO</a>
        <a href="#gestao-sobre" class="mobile-link" (click)="closeMenu()">SOBRE</a>
        <a href="#gestao-modulos" class="mobile-link" (click)="closeMenu()">MÓDULOS</a>
      </nav>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Rewrite `header.component.ts`** (drops the dropdown state/methods the removed markup no longer uses)

```typescript
import { Component, signal } from '@angular/core';

// Sticky header with a mobile menu.
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);

  // Toggles the mobile menu open/closed.
  toggleMenu(): void {
    this.isMenuOpen.update(state => !state);
  }

  // Closes the mobile menu.
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
```

- [ ] **Step 3: Rewrite `header.component.scss`** (Gestão Una colors, dropdown rules removed, logo inverted to white like SISAMB's — the source logo asset has dark navy lettering that would disappear against the dark purple header background otherwise)

```scss
// --- HEADER CONFIGURATION ---
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: var(--secondary-gestao);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    position: relative;
  }
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1010; // Stays above the mobile menu when it opens

  .logo-img {
    height: 32px;
    width: auto;
    object-fit: contain;
    // The Gestão Una logo asset has dark navy lettering; invert it to white
    // so it reads on the header's dark background (same treatment SISAMB
    // uses for its own dark-text logo).
    filter: brightness(0) invert(1);
  }
}

/* NAV MENU DESKTOP */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 100%;

  @media (max-width: 1024px) {
    display: none; // Hides the classic menu on mobile/tablet
  }
}

.nav-link {
  text-decoration: none;
  color: var(--white);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-gestao);
  }

  &.active {
    color: var(--primary-gestao);

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: var(--primary-gestao);
      border-radius: 10px 10px 0 0;
    }
  }
}

/* RESPONSIVE HAMBURGER BUTTON */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1010; // Ensures it stays clickable above the expanded menu

  @media (max-width: 1024px) {
    display: flex; // Only shown on smaller screens
  }

  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: var(--white);
    border-radius: 2px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
}

/* TRANSFORMS THE HAMBURGER INTO AN "X" */
.header.menu-open {
  .hamburger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  .hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

/* RESPONSIVE MOBILE MENU */
.mobile-menu {
  display: none;
  background-color: var(--secondary-gestao);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: fixed; // Fills the screen correctly while scrolling
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px); // Takes up the remaining viewport
  box-shadow: var(--shadow-md);
  z-index: 999;
  overflow-y: auto; // Allows inner scroll if there are many links
}

// Shows the mobile block on click
.header.menu-open .mobile-menu {
  @media (max-width: 1024px) {
    display: block;
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 20px;

  .mobile-link {
    text-decoration: none;
    color: var(--white);
    font-weight: 600;
    font-size: 1.1rem;
    padding: 8px 0;
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    cursor: pointer;

    &:hover {
      color: var(--primary-gestao);
    }
  }
}
```

- [ ] **Step 4: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/shared/components/header
git commit -m "feat: adapt the Gestão Una header (content, colors, drop the Catec-only dropdown)"
```

---

### Task 3: Build the hero section

**Files:**
- Modify: `src/app/pages/gestao-una/shared/section/hero-section/hero-section.component.html`
- Modify: `src/app/pages/gestao-una/shared/section/hero-section/hero-section.component.scss`
- Modify: `src/app/pages/gestao-una/shared/section/hero-section/hero-section.component.ts`

**Interfaces:**
- Consumes: `CardComponent` (`app-card`, from Task 1) with inputs `icon: string`, `title: string`, `description: string`; `ButtonComponent` (`app-gestao-button`, from Task 1) with input `variant: 'primary'|'secondary'|'outline'`.
- Produces: `<app-hero-section>`, consumed as-is by Task 6's `home.page.html`.

- [ ] **Step 1: Write `hero-section.component.ts`**

```typescript
import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

// Gestão Una main WhatsApp line (same number used in the footer/floating button).
const GESTAO_WHATSAPP_PHONE = '5585996157126';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private readonly featuresCard =
    viewChild<ElementRef<HTMLElement>>('featuresCard');

  constructor() {
    // Reveals the differentiator cards with a staggered animation once they
    // scroll into view, same behavior as the Catec hero's cards.
    afterNextRender(() => {
      const grid = this.featuresCard()?.nativeElement;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        grid.classList.add('in-view');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            grid.classList.add('in-view');
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(grid);
    });
  }

  // Opens WhatsApp with a pre-filled message to the Gestão Una line.
  abrirWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de saber mais sobre o Gestão Una.',
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=${GESTAO_WHATSAPP_PHONE}&text=${text}`,
      '_blank',
    );
  }
}
```

- [ ] **Step 2: Write `hero-section.component.html`**

```html
<section class="hero-section" id="gestao-inicio">
  <div class="hero-container">
    <!-- Left side: Text and CTAs -->
    <div class="hero-content">
      <h1 class="hero-title">
        Gestão eficiente para todas as suas instituições, <br />
        <span class="highlight">em um só lugar</span>
      </h1>
      <p class="hero-subtitle">
        O Gestão Una centraliza e integra dados que hoje estão espalhados em
        sistemas diferentes, dando à sua instituição — pública ou privada —
        um ponto único de acesso às informações que importam.
      </p>

      <div class="hero-actions">
        <app-gestao-button variant="primary" (click)="abrirWhatsApp()">
          Fale Conosco <i class="fa-solid fa-arrow-right"></i>
        </app-gestao-button>
      </div>
    </div>

    <!-- Right side: Main image -->
    <div class="hero-image-wrapper">
      <img
        src="images/gestao.webp"
        alt="Gestão Una"
        class="hero-img"
      />
    </div>
  </div>

  <!-- Floating card of differentiators, built from the reusable components -->
  <div class="hero-features-container">
    <div class="hero-features-card" #featuresCard>
      <app-card
        icon="storage"
        title="Dados Centralizados"
        description="Reúna as informações da sua instituição em um único ponto de acesso, sem depender de sistemas espalhados."
      >
      </app-card>

      <app-card
        icon="hub"
        title="Integração de Sistemas"
        description="Conecte diferentes plataformas e bases de dados, eliminando retrabalho entre equipes e setores."
      >
      </app-card>

      <app-card
        icon="bolt"
        title="Gestão Simplificada"
        description="Menos burocracia e mais clareza no dia a dia de quem administra a instituição."
      >
      </app-card>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write `hero-section.component.scss`**

```scss
.hero-section {
  width: 100%;
  background: #fffefe;
  padding: 0 24px 30px;
  position: relative;
  box-sizing: border-box;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 0 16px 30px;
  }
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
}

/* LEFT CONTENT */
.hero-content {
  flex: 1;
  width: 100%;
  max-width: 580px;
  z-index: 2;

  .hero-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--secondary-gestao);
    line-height: 1.2;
    letter-spacing: -1px;
    margin-bottom: 16px;

    .highlight {
      color: var(--primary-gestao);
    }
  }

  .hero-subtitle {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 24px;
    text-align: justify;

    @media (max-width: 968px) {
      text-align: center;
    }
  }
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    app-gestao-button {
      width: 100%;
      display: block;
    }
  }
}

/* RIGHT-SIDE IMAGE */
.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 540px;

  .hero-img {
    width: 100%;
    max-height: 420px;
    height: auto;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
}

/* BOTTOM CARD */
.hero-features-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 40px auto;
  padding: 0;
  z-index: 5;

  @media (max-width: 968px) {
    margin-top: 32px;
    margin-bottom: 32px;
  }
}

.hero-features-card {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  app-card {
    display: block;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  &.in-view app-card {
    opacity: 1;
    transform: translateY(0);
    animation: card-float 6s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        transition-delay: #{($i - 1) * 0.12}s;
        animation-delay: #{0.6 + ($i - 1) * 0.4}s;
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @keyframes card-float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-7px) rotate(0.6deg);
    }
  }

  ::ng-deep .gestao-card {
    transition:
      transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
      box-shadow 0.4s ease,
      border-color 0.4s ease;

    &:hover {
      transform: translateY(-10px) scale(1.02);
      border-color: rgba(0, 191, 165, 0.35);
      box-shadow:
        0 20px 32px -14px rgba(0, 191, 165, 0.3),
        var(--shadow-lg);
    }
  }

  ::ng-deep .icon-wrapper {
    transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  ::ng-deep .gestao-card:hover .icon-wrapper {
    transform: rotate(-8deg) scale(1.15);
  }

  &.in-view ::ng-deep .card-icon {
    animation: icon-wiggle 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  }

  @for $i from 1 through 3 {
    &.in-view app-card:nth-child(#{$i}) ::ng-deep .card-icon {
      animation-delay: #{0.9 + ($i - 1) * 0.35}s;
    }
  }

  ::ng-deep .gestao-card:hover .card-icon {
    animation-play-state: paused;
  }

  @keyframes icon-wiggle {
    0%,
    100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(7deg) scale(1.05);
    }
    50% {
      transform: rotate(0deg) scale(1.1);
    }
    75% {
      transform: rotate(-7deg) scale(1.05);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    app-card {
      opacity: 1;
      transform: none;
      transition: none;
      animation: none;
    }

    ::ng-deep .gestao-card:hover {
      transform: none;
    }

    ::ng-deep .gestao-card:hover .icon-wrapper {
      transform: none;
    }

    ::ng-deep .card-icon {
      animation: none;
    }
  }
}
```

- [ ] **Step 4: Verify it compiles and renders**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds. This section will be visually checked in the browser in Task 8 once it's wired into `home.page.html` (Task 6) — it isn't reachable from the route yet.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/shared/section/hero-section
git commit -m "feat: build the Gestão Una hero section"
```

---

### Task 4: Build the about section

**Files:**
- Modify: `src/app/pages/gestao-una/shared/section/about-section/about-section.component.html`
- Modify: `src/app/pages/gestao-una/shared/section/about-section/about-section.component.scss`
- Modify: `src/app/pages/gestao-una/shared/section/about-section/about-section.component.ts`

**Interfaces:**
- Consumes: nothing (this section uses hand-rolled feature cards, not `app-card`, matching Catec's about-section pattern).
- Produces: `<app-about-section>`, consumed as-is by Task 6's `home.page.html`.

- [ ] **Step 1: Write `about-section.component.ts`**

```typescript
import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-about-section',
  imports: [],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
})
// "Sobre" section: company story and benefit cards.
export class AboutSectionComponent {
  private readonly featuresGrid =
    viewChild<ElementRef<HTMLElement>>('featuresGrid');

  constructor() {
    // Reveals the benefit cards with a staggered animation once the grid
    // scrolls into view, same behavior as the Catec about-section.
    afterNextRender(() => {
      const grid = this.featuresGrid()?.nativeElement;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        grid.classList.add('in-view');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            grid.classList.add('in-view');
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(grid);
    });
  }
}
```

- [ ] **Step 2: Write `about-section.component.html`**

```html
<section class="about-section" id="gestao-sobre">
  <div class="about-container">
    <div class="about-top">
      <div class="about-content">
        <span class="section-badge section-badge--gestao">Sobre o Gestão Una</span>
        <h2 class="section-title section-title--gestao">
          Tecnologia a serviço da
          <span class="highlight">gestão institucional</span>
        </h2>

        <p class="about-description">
          O <strong>Gestão Una</strong> nasceu para resolver um problema comum
          a instituições públicas e privadas: informações espalhadas em
          sistemas independentes que não conversam entre si. A plataforma
          centraliza esses dados em um único ponto de acesso, simplificando a
          rotina de gestão e dando mais clareza para a tomada de decisão.
        </p>
      </div>

      <div class="about-image-wrapper">
        <div class="about-bg-shape"></div>

        <img
          src="images/gestao.webp"
          alt="Gestão Una"
          class="about-img"
          loading="lazy"
          decoding="async"
        />

        <div class="metric-badge">
          <span class="material-icons badge-icon">hub</span>
          <div class="metric-text">
            <span class="number">100% Centralizado</span>
            <span class="label">Dados em um só lugar</span>
          </div>
        </div>
      </div>
    </div>

    <div class="about-features-grid" #featuresGrid>
      <div class="feature-card">
        <span class="material-icons feature-icon">check_circle</span>
        <div class="feature-text">
          <strong>Centralização de Dados</strong>
          <p>Um único ponto de acesso para as informações da sua instituição.</p>
        </div>
      </div>

      <div class="feature-card">
        <span class="material-icons feature-icon">check_circle</span>
        <div class="feature-text">
          <strong>Integração de Sistemas</strong>
          <p>Conecte plataformas diferentes sem retrabalho manual.</p>
        </div>
      </div>

      <div class="feature-card">
        <span class="material-icons feature-icon">check_circle</span>
        <div class="feature-text">
          <strong>Segurança da Informação</strong>
          <p>Dados protegidos com controle de acesso por perfil de usuário.</p>
        </div>
      </div>

      <div class="feature-card">
        <span class="material-icons feature-icon">check_circle</span>
        <div class="feature-text">
          <strong>Relatórios e Indicadores</strong>
          <p>Visão clara da instituição para apoiar decisões mais rápidas.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write `about-section.component.scss`**

```scss
.about-section {
  width: 100%;
  background: #fffefe;
  padding: 30px 0 0;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 80px;

  @media (max-width: 968px) {
    padding: 30px 0 0;
    position: relative;
    overflow: hidden;
  }
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.about-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 48px;
  }
}

.about-content {
  flex: 1;
  max-width: 580px;
  width: 100%;

  @media (max-width: 968px) {
    max-width: 100%;
  }

  .section-title {
    .highlight {
      position: relative;
      z-index: 0;

      &::after {
        content: "";
        position: absolute;
        left: -2px;
        right: -2px;
        bottom: 3px;
        height: 9px;
        background: rgba(0, 191, 165, 0.18);
        border-radius: 4px;
        z-index: -1;
      }
    }
  }

  .about-description {
    font-size: 1.125rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 32px;
    text-align: justify;

    strong {
      color: var(--secondary-gestao);
    }

    @media (max-width: 576px) {
      font-size: 1rem;
      margin-bottom: 24px;
    }
  }
}

.about-features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius-md, 12px);
  padding: 16px;
  box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.1);

  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;

  &:hover {
    border-color: rgba(0, 191, 165, 0.35);
    box-shadow:
      0 18px 28px -12px rgba(0, 191, 165, 0.25),
      var(--shadow-md);
  }

  .feature-icon {
    color: var(--primary-gestao);
    font-size: 1.4rem;
    margin-top: 1px;
    flex-shrink: 0;
    transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  &:hover .feature-icon {
    transform: rotate(-8deg) scale(1.15);
  }

  .feature-text {
    strong {
      display: block;
      color: var(--secondary-gestao);
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
    }
  }
}

.about-features-grid.in-view .feature-card {
  opacity: 1;
  transform: translateY(0);
  animation: feature-card-float 6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    infinite;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      transition-delay: #{($i - 1) * 0.1}s;
      animation-delay: #{0.6 + ($i - 1) * 0.3}s;
    }
  }

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes feature-card-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .about-features-grid.in-view .feature-card {
    animation: none;
  }

  .feature-card:hover .feature-icon {
    transform: none;
  }
}

.about-image-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;

  .about-bg-shape {
    position: absolute;
    width: 82%;
    height: 82%;
    top: 14px;
    right: 4%;
    background: var(--primary-gestao);
    opacity: 0.1;
    border-radius: var(--radius-lg, 24px);
    transform: rotate(-4deg);
    z-index: 0;
  }

  .about-img {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 540px;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }
}

.metric-badge {
  position: absolute;
  bottom: 0;
  left: 20px;
  background-color: var(--secondary-gestao);
  color: var(--white);
  padding: 16px 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 3;
  animation: badge-float 4s ease-in-out infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 576px) {
    left: 50%;
    animation: none;
    width: calc(100% - 32px);
    max-width: 360px;
    padding: 12px 18px;
    gap: 12px;
    transform: translateX(-50%);
  }

  .badge-icon {
    font-size: 2.5rem;
    color: var(--primary-gestao);
    flex-shrink: 0;

    @media (max-width: 576px) {
      font-size: 2rem;
    }
  }

  .metric-text {
    display: flex;
    flex-direction: column;

    .number {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.2;

      @media (max-width: 576px) {
        font-size: 1.1rem;
      }
    }

    .label {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 500;

      @media (max-width: 576px) {
        font-size: 0.8rem;
      }
    }
  }
}

@keyframes badge-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .metric-badge {
    animation: none;
  }
}
```

- [ ] **Step 4: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/shared/section/about-section
git commit -m "feat: build the Gestão Una about section"
```

---

### Task 5: Build the modules section (reusing `more-products-section`)

**Files:**
- Modify: `src/app/pages/gestao-una/shared/section/more-products-section/more-products-section.component.html`
- Modify: `src/app/pages/gestao-una/shared/section/more-products-section/more-products-section.component.scss`
- Modify: `src/app/pages/gestao-una/shared/section/more-products-section/more-products-section.component.ts`

**Interfaces:**
- Consumes: `CardComponent` (`app-card`, from Task 1) with inputs `icon: string`, `title: string`, `description: string`; `ButtonComponent` (`app-gestao-button`, from Task 1).
- Produces: `<app-more-products-section>`, consumed as-is by Task 6's `home.page.html`.

- [ ] **Step 1: Write `more-products-section.component.ts`**

```typescript
import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

// Gestão Una main WhatsApp line (same number used in the footer/floating button).
const GESTAO_WHATSAPP_PHONE = '5585996157126';

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
export class MoreProductsSectionComponent {
  private readonly productsGrid =
    viewChild<ElementRef<HTMLElement>>('productsGrid');

  constructor() {
    // Reveals the module cards with a staggered animation once the grid
    // scrolls into view, same behavior as the Catec more-products-section.
    afterNextRender(() => {
      const grid = this.productsGrid()?.nativeElement;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        grid.classList.add('in-view');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            grid.classList.add('in-view');
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(grid);
    });
  }

  // Opens WhatsApp with a pre-filled message to the Gestão Una line.
  abrirWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de saber mais sobre os módulos do Gestão Una.',
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=${GESTAO_WHATSAPP_PHONE}&text=${text}`,
      '_blank',
    );
  }
}
```

- [ ] **Step 2: Write `more-products-section.component.html`**

```html
<section class="more-products-section" id="gestao-modulos">
  <div class="section-container text-center">
    <span class="section-badge section-badge--gestao">Módulos</span>
    <h2 class="section-title section-title--gestao">
      Um sistema completo <br />
      <span class="highlight">para a gestão da sua instituição</span>
    </h2>
    <p class="section-subtitle section-subtitle--gestao">
      O Gestão Una reúne, em uma única plataforma, os módulos que sua
      instituição precisa para centralizar processos e informações.
    </p>

    <div class="products-grid" #productsGrid>
      <app-card
        icon="task_alt"
        title="Gestão de Processos"
        description="Centralize o acompanhamento de processos e tarefas em um único ambiente, com visibilidade clara de cada etapa."
      >
      </app-card>

      <app-card
        icon="insights"
        title="Painéis e Relatórios"
        description="Acompanhe indicadores e gere relatórios para apoiar decisões com dados confiáveis."
      >
      </app-card>

      <app-card
        icon="hub"
        title="Integração de Sistemas"
        description="Conecte diferentes sistemas e bases de dados da sua instituição em uma única plataforma."
      >
      </app-card>

      <app-card
        icon="admin_panel_settings"
        title="Controle de Acesso"
        description="Defina perfis e permissões para garantir que cada usuário acesse só o que precisa."
      >
      </app-card>
    </div>

    <div class="more-products-actions">
      <app-gestao-button variant="primary" (click)="abrirWhatsApp()">
        Fale Conosco
        <i class="fa-solid fa-arrow-right"></i>
      </app-gestao-button>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write `more-products-section.component.scss`**

```scss
.more-products-section {
  width: 100%;
  background-color: var(--white);
  padding: 30px 24px 0;
  box-sizing: border-box;
  scroll-margin-top: 80px;

  .highlight {
    color: var(--primary-gestao);
  }

  .section-subtitle {
    max-width: 960px;
  }

  @media (max-width: 768px) {
    padding: 30px 16px 0;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 960px;
  margin: 0 auto 48px auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }

  app-card {
    display: block;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  &.in-view app-card {
    opacity: 1;
    transform: translateY(0);
    animation: card-float 6s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        transition-delay: #{($i - 1) * 0.12}s;
        animation-delay: #{0.6 + ($i - 1) * 0.4}s;
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @keyframes card-float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-7px) rotate(0.6deg);
    }
  }

  ::ng-deep .gestao-card {
    transition:
      transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
      box-shadow 0.4s ease,
      border-color 0.4s ease;

    &:hover {
      transform: translateY(-10px) scale(1.02);
      border-color: rgba(0, 191, 165, 0.35);
      box-shadow:
        0 20px 32px -14px rgba(0, 191, 165, 0.3),
        var(--shadow-lg);
    }
  }

  ::ng-deep .icon-wrapper {
    transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  ::ng-deep .gestao-card:hover .icon-wrapper {
    transform: rotate(-8deg) scale(1.15);
  }

  &.in-view ::ng-deep .card-icon {
    animation: icon-wiggle 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  }

  @for $i from 1 through 4 {
    &.in-view app-card:nth-child(#{$i}) ::ng-deep .card-icon {
      animation-delay: #{0.9 + ($i - 1) * 0.35}s;
    }
  }

  ::ng-deep .gestao-card:hover .card-icon {
    animation-play-state: paused;
  }

  @keyframes icon-wiggle {
    0%,
    100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(7deg) scale(1.05);
    }
    50% {
      transform: rotate(0deg) scale(1.1);
    }
    75% {
      transform: rotate(-7deg) scale(1.05);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    app-card {
      opacity: 1;
      transform: none;
      transition: none;
      animation: none;
    }

    ::ng-deep .gestao-card:hover {
      transform: none;
    }

    ::ng-deep .gestao-card:hover .icon-wrapper {
      transform: none;
    }

    ::ng-deep .card-icon {
      animation: none;
    }
  }
}

.more-products-actions {
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    app-gestao-button {
      width: 100%;
      display: block;
    }
  }
}
```

- [ ] **Step 4: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/shared/section/more-products-section
git commit -m "feat: build the Gestão Una modules section"
```

---

### Task 6: Wire the home page and remove dead scaffolding

**Files:**
- Modify: `src/app/pages/gestao-una/home/home.page.ts`
- Modify: `src/app/pages/gestao-una/home/home.page.html`
- Delete: `src/app/pages/gestao-una/shared/components/whatsapp-button/` (whole folder — dead scaffolding; the global `<app-whatsapp-button>` in `app.component.html` already covers every route, `/gestao-una` included, with the same phone number)

**Interfaces:**
- Consumes: `HeaderComponent` (Task 2), `HeroSectionComponent` (Task 3), `AboutSectionComponent` (Task 4), `MoreProductsSectionComponent` (Task 5), `FooterComponent` (already existing, `theme` input).
- Produces: the assembled `/gestao-una` page.

- [ ] **Step 1: Rewrite `home.page.ts`**

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HeroSectionComponent } from '../shared/section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../shared/section/about-section/about-section.component';
import { MoreProductsSectionComponent } from '../shared/section/more-products-section/more-products-section.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    MoreProductsSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// Gestão Una home page: assembles the shared sections into the LP.
export class HomePage implements OnInit, OnDestroy {
  // Applies the Gestão Una scrollbar theme while this page is active, and
  // clears any scrollbar theme left over from another LP.
  ngOnInit(): void {
    document.body.classList.remove(
      'scroll-theme-tonomei',
      'scroll-theme-sisamb',
    );
    document.body.classList.add('scroll-theme-gestao');
  }

  // Removes the Gestão Una scrollbar theme when leaving the page.
  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-gestao');
  }
}
```

- [ ] **Step 2: Rewrite `home.page.html`**

```html
<!-- Header -->
<app-header></app-header>

<!-- Hero -->
<app-hero-section></app-hero-section>

<!-- About / who we are -->
<app-about-section></app-about-section>

<!-- Modules -->
<app-more-products-section></app-more-products-section>

<!-- Footer -->
<app-footer theme="gestao"></app-footer>
```

- [ ] **Step 3: Delete the unused whatsapp-button stub**

```bash
rm -r src/app/pages/gestao-una/shared/components/whatsapp-button
```

- [ ] **Step 4: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds with no errors (in particular, no leftover import referencing the deleted `whatsapp-button` folder).

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gestao-una/home src/app/pages/gestao-una/shared/components/whatsapp-button
git commit -m "feat: assemble the Gestão Una home page and drop the unused brand-specific WhatsApp button stub"
```

---

### Task 7: Enable the Gestão Una card in the Catec home carousel

**Files:**
- Modify: `src/app/pages/catec/shared/section/tonomei-section/tonomei-section.component.ts:93`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new — this only flips a data flag already read by the existing `openSystemPage()` method (`src/app/pages/catec/shared/section/tonomei-section/tonomei-section.component.ts:165-174`), which already has `route: '/gestao-una'` for this slide.

- [ ] **Step 1: Flip the flag**

In the `gestao` slide object (around line 82-94), change:

```typescript
      route: '/gestao-una',
      clickable: false,
```

to:

```typescript
      route: '/gestao-una',
      clickable: true,
```

- [ ] **Step 2: Verify it compiles**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng build --configuration development`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/catec/shared/section/tonomei-section/tonomei-section.component.ts
git commit -m "feat: make the Gestão Una card in the Catec carousel clickable now that the LP exists"
```

---

### Task 8: End-to-end verification in the browser

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `cd C:\Users\renat\landing-pages\catec && npx ng serve` (leave running)

- [ ] **Step 2: Open `http://localhost:4200/gestao-una` in Chrome**

Check against the spec (`docs/superpowers/specs/2026-08-29-gestao-una-landing-page-design.md`):
- Header: Gestão Una logo (white/inverted, readable on the dark purple bar), nav links Início/Sobre/Módulos, no leftover "CATEC"/dropdown.
- Hero: headline + subtitle + "Fale Conosco" button (opens WhatsApp with the Gestão Una number) + 3 teal-accented floating cards + `gestao.webp` image.
- About: badge/title/paragraph + image + 4 diferenciais cards.
- Módulos: 4 cards (Gestão de Processos, Painéis e Relatórios, Integração de Sistemas, Controle de Acesso) + "Fale Conosco" button.
- Footer: Gestão Una logo, WhatsApp/e-mail links, no tônomei-only app-store block.
- No Catec orange visible anywhere on the page (confirms Task 1's color fix took effect).
- Resize to a mobile width and confirm the hamburger menu opens/closes and the nav links scroll to the right sections.

- [ ] **Step 3: Open `http://localhost:4200/` and confirm the carousel change**

In the "Soluções em Destaque" carousel, navigate to the Gestão Una slide and click "Experimente o Gestão Una" — it should navigate to `/gestao-una` (previously a no-op).

- [ ] **Step 4: Report back**

Note any visual issues found against the spec so they can be fixed before considering the page done.
