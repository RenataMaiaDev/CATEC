# Rodapé (tônomei, Catec, Gestão UNA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one reusable, minimalist `FooterComponent` (contact info + copyright + legal links, in the header's color, with the Catec logo) and wire it into the tônomei, Catec, and Gestão UNA home pages.

**Architecture:** A single standalone Angular component in `src/app/components/footer/` takes a `theme` input (`'tonomei' | 'catec' | 'gestao'`) that drives its background color (matching that page's own header color) and the brand name shown in the copyright line. Contact details (phone, email, location) and the Catec logo are identical across all three instances — only `theme` changes per page. Each home page imports and places `<app-footer>` as its last element.

**Tech Stack:** Angular 19 (standalone components), SCSS, Font Awesome 6 (already loaded globally via CDN in `src/index.html` — icons used elsewhere in the project as `<i class="fa-solid fa-...">` / `<i class="fa-brands fa-...">`, no import needed).

## Global Constraints

- Contact details are identical on every instance: phone `(85) 9 9804-9463` (WhatsApp link uses `5585998049463`), email `tonomei@catecsolucoes.com.br`, location `Ceará, Brasil`.
- Copyright line format: `© {ano atual} {marca} · Todos os direitos reservados.` — `{marca}` is `tônomei · Gestão UNA` on the tônomei page, `CATEC Soluções` on the Catec page, `Gestão UNA` on the Gestão UNA page.
- "Termos de Uso" / "Privacidade" links are placeholders (`href="#"`, `(click)="$event.preventDefault()"`) — no real pages exist yet.
- Background color always equals that page's own header background: `var(--primary-tonomei)` for tônomei, `var(--secondary-catec)` for both Catec and Gestão UNA (Gestão UNA's own header already uses `--secondary-catec` today).
- The Catec logo used is always `img/logo-catec-solucoes1.png` (the white-on-transparent version already in `public/img/`, meant for dark backgrounds).
- No test files exist for any other component in this codebase (only `src/app/app.component.spec.ts` exists, created by the Angular CLI scaffold) — this project does not follow a per-component unit-test convention. Verification for this plan is done by running the dev server and visually checking the rendered footer in the browser, consistent with how every other visual component in this codebase was built.
- This is not a git repository at the `landing-pages` root; the actual repo root is `catec/` (confirmed via `git status`/`git branch` inside that folder). All file paths below are relative to `C:\Users\renat\landing-pages\catec`.

---

## File Structure

- Create `src/app/components/footer/footer.component.ts` — standalone component, `theme` input, brand-name lookup, WhatsApp URL, current year.
- Create `src/app/components/footer/footer.component.html` — markup for the two-row footer described in the spec.
- Create `src/app/components/footer/footer.component.scss` — layout + the two background-color variants + responsive stacking.
- Modify `src/app/pages/tonomei/home/home.page.ts` and `home.page.html` — import and render `<app-footer theme="tonomei">`.
- Modify `src/app/pages/catec/home/home.page.ts` and `home.page.html` — import and render `<app-footer theme="catec">`.
- Modify `src/app/pages/gestao-una/home/home.page.ts` and `home.page.html` — import and render `<app-footer theme="gestao">`.

---

### Task 1: Create `FooterComponent` and wire it into the tônomei page

**Files:**
- Create: `src/app/components/footer/footer.component.ts`
- Create: `src/app/components/footer/footer.component.html`
- Create: `src/app/components/footer/footer.component.scss`
- Modify: `src/app/pages/tonomei/home/home.page.ts` (full file, shown below)
- Modify: `src/app/pages/tonomei/home/home.page.html:7` (append after the last line)

**Interfaces:**
- Produces: `FooterComponent` (selector `app-footer`), `@Input() theme: 'tonomei' | 'catec' | 'gestao'` (default `'tonomei'`). Later tasks (2 and 3) consume this exact selector and input.

- [ ] **Step 1: Create the component TypeScript file**

`src/app/components/footer/footer.component.ts`:

```ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FooterTheme = 'tonomei' | 'catec' | 'gestao';

const BRAND_NAMES: Record<FooterTheme, string> = {
  tonomei: 'tônomei · Gestão UNA',
  catec: 'CATEC Soluções',
  gestao: 'Gestão UNA',
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() theme: FooterTheme = 'tonomei';

  readonly whatsappUrl =
    'https://api.whatsapp.com/send/?phone=5585998049463&text=' +
    encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas sobre o tônomei.',
    );

  get brandName(): string {
    return BRAND_NAMES[this.theme];
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
```

- [ ] **Step 2: Create the component template**

`src/app/components/footer/footer.component.html`:

```html
<footer class="footer" [ngClass]="'footer--' + theme">
  <div class="footer-container">
    <div class="footer-top">
      <img
        src="img/logo-catec-solucoes1.png"
        alt="CATEC Soluções"
        class="footer-logo"
      />

      <div class="footer-contact">
        <a
          class="footer-item"
          [href]="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-whatsapp"></i>
          <span>(85) 9 9804-9463</span>
        </a>

        <a class="footer-item" href="mailto:tonomei@catecsolucoes.com.br">
          <i class="fa-solid fa-envelope"></i>
          <span>tonomei@catecsolucoes.com.br</span>
        </a>

        <span class="footer-item">
          <i class="fa-solid fa-location-dot"></i>
          <span>Ceará, Brasil</span>
        </span>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © {{ currentYear }} {{ brandName }} · Todos os direitos reservados.
      </p>

      <div class="footer-links">
        <a href="#" (click)="$event.preventDefault()">Termos de Uso</a>
        <span class="footer-sep">|</span>
        <a href="#" (click)="$event.preventDefault()">Privacidade</a>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create the component styles**

`src/app/components/footer/footer.component.scss`:

```scss
.footer {
  padding: 28px 24px 20px;
  font-size: 0.85rem;

  &.footer--tonomei {
    background-color: var(--primary-tonomei);
  }

  &.footer--catec,
  &.footer--gestao {
    background-color: var(--secondary-catec);
  }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-logo {
  height: 22px;
  width: auto;
  object-fit: contain;
}

.footer-contact {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;

  i {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
  }
}

a.footer-item:hover {
  color: var(--white);

  i {
    color: var(--white);
  }
}

.footer-divider {
  margin: 20px 0 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;

    &:hover {
      color: var(--white);
    }
  }

  .footer-sep {
    color: rgba(255, 255, 255, 0.3);
  }
}

@media (max-width: 640px) {
  .footer-top,
  .footer-bottom {
    justify-content: center;
    text-align: center;
  }
}
```

- [ ] **Step 4: Wire the footer into the tônomei home page**

Replace the full contents of `src/app/pages/tonomei/home/home.page.ts`:

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { HeroSectionComponent } from '../section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../section/about-section/about-section.component';
import { MoreProductsSectionComponent } from '../section/more-products-section/more-products-section.component';
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
export class HomePage implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-tonomei');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-tonomei');
  }
}
```

Replace the full contents of `src/app/pages/tonomei/home/home.page.html`:

```html
<app-header></app-header>

<app-hero-section></app-hero-section>

<app-about-section></app-about-section>

<app-more-products-section></app-more-products-section>

<app-footer theme="tonomei"></app-footer>
```

- [ ] **Step 5: Verify in the browser**

Run: `npm start` (from `C:\Users\renat\landing-pages\catec`), then open the tônomei route in a browser.

Expected: a thin dark-purple (`#110627`) footer at the bottom of the page showing the white Catec logo, a clickable WhatsApp phone number, a clickable email, "Ceará, Brasil", and below a thin divider the line "© 2026 tônomei · Gestão UNA · Todos os direitos reservados." with "Termos de Uso | Privacidade" links that don't navigate anywhere when clicked. Resize the window narrow (e.g. 375px) and confirm the items wrap and stay centered instead of overflowing.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/footer src/app/pages/tonomei/home/home.page.ts src/app/pages/tonomei/home/home.page.html
git commit -m "feat: add minimalist footer component and wire it into tonomei page"
```

---

### Task 2: Wire the footer into the Catec home page

**Files:**
- Modify: `src/app/pages/catec/home/home.page.ts` (full file, shown below)
- Modify: `src/app/pages/catec/home/home.page.html:10` (append after the last line)

**Interfaces:**
- Consumes: `FooterComponent` / `app-footer` / `theme` input, from Task 1 (`src/app/components/footer/footer.component.ts`).

- [ ] **Step 1: Wire the footer into the Catec home page**

Replace the full contents of `src/app/pages/catec/home/home.page.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { AboutSectionComponent } from '../shared/section/about-section/about-section.component';
import { HeroSectionComponent } from '../shared/section/hero-section/hero-section.component';
import { MoreProductsSectionComponent } from '../shared/section/more-products-section/more-products-section.component';
import { TonomeiSectionComponent } from '../shared/section/tonomei-section/tonomei-section.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    TonomeiSectionComponent,
    MoreProductsSectionComponent,
    FooterComponent,
  ], // Importando os componentes reutilizáveis
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    // Catec é a marca padrão (cor base da barra de rolagem) — só garante
    // que não sobrou classe de outra LP no body.
    document.body.classList.remove(
      'scroll-theme-tonomei',
      'scroll-theme-gestao',
      'scroll-theme-sisamb',
    );
  }
}
```

Replace the full contents of `src/app/pages/catec/home/home.page.html`:

```html
<!-- 1ª Seção: Nova Hero Dinâmica com os Destaques Flutuantes -->
<app-header></app-header>

<app-hero-section></app-hero-section>

<app-about-section></app-about-section>

<app-tonomei-section></app-tonomei-section>

<app-more-products-section></app-more-products-section>

<app-footer theme="catec"></app-footer>
```

- [ ] **Step 2: Verify in the browser**

Run: `npm start` (if not already running), open the Catec home route.

Expected: same thin footer, now in the slate color `#1e293b` (matching that page's own header), copyright line reads "© 2026 CATEC Soluções · Todos os direitos reservados.". Phone, email, and location are unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/catec/home/home.page.ts src/app/pages/catec/home/home.page.html
git commit -m "feat: add footer to Catec home page"
```

---

### Task 3: Wire the footer into the Gestão UNA home page

**Files:**
- Modify: `src/app/pages/gestao-una/home/home.page.ts` (full file, shown below)
- Modify: `src/app/pages/gestao-una/home/home.page.html` (full file, shown below)

**Interfaces:**
- Consumes: `FooterComponent` / `app-footer` / `theme` input, from Task 1 (`src/app/components/footer/footer.component.ts`).

- [ ] **Step 1: Wire the footer into the Gestão UNA home page**

This page currently has no sections wired up yet (`imports: []`, template is a single HTML comment) — that is out of scope for this plan. Only the footer is added, without building the missing sections.

Replace the full contents of `src/app/pages/gestao-una/home/home.page.ts`:

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-gestao');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-gestao');
  }
}
```

Replace the full contents of `src/app/pages/gestao-una/home/home.page.html`:

```html
<!-- 1ª Seção: Nova Hero Dinâmica com os Destaques Flutuantes -->

<app-footer theme="gestao"></app-footer>
```

- [ ] **Step 2: Verify in the browser**

Run: `npm start` (if not already running), open the Gestão UNA home route.

Expected: the same slate-colored (`#1e293b`) thin footer renders at the top of the otherwise-empty page (since no other sections exist yet on this page), with the copyright line reading "© 2026 Gestão UNA · Todos os direitos reservados."

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/gestao-una/home/home.page.ts src/app/pages/gestao-una/home/home.page.html
git commit -m "feat: add footer to Gestao UNA home page"
```
