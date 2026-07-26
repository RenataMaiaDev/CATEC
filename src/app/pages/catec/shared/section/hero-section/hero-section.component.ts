import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  openWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas e saber mais sobre as soluções da CATEC.',
    );
    const url = `https://api.whatsapp.com/send/?phone=5585996157126&text=${text}`;
    window.open(url, '_blank');
  }
}
