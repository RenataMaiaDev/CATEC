import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  // Scrolls to the módulos section — stands in for "watch the video" until a
  // real product video exists.
  scrollToModulos(event: Event): void {
    event.preventDefault();
    document
      .getElementById('sisamb-modulos')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
