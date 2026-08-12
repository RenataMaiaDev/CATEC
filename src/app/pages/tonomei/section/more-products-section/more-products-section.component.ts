import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';
import { CardComponent } from '../../../../components/card/card.component';

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [TonomeiButtonComponent, CardComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "Conheça as Vantagens" section: feature grid and sign-up CTA.
export class MoreProductsSectionComponent {
  private readonly featuresGrid =
    viewChild<ElementRef<HTMLElement>>('featuresGrid');

  constructor() {
    // Reveals the feature cards with a staggered animation once the grid
    // scrolls into view, same behavior as the CATEC "Nossos Serviços" cards.
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

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
