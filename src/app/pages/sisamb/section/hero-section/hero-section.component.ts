import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

// SISAMB main WhatsApp line (same number used across the footer/floating button).
const SISAMB_WHATSAPP_PHONE = '5585996157126';

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
    // scroll into view, same pattern used across the site's other sections.
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

  // Opens WhatsApp with a pre-filled message to the SISAMB line.
  abrirWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de saber mais sobre o SISAMB.',
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=${SISAMB_WHATSAPP_PHONE}&text=${text}`,
      '_blank',
    );
  }
}
