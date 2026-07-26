import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
export class MoreProductsSectionComponent {
  openWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas e saber mais sobre as soluções da CATEC.',
    );
    const url = `https://api.whatsapp.com/send/?phone=5585996157126&text=${text}`;
    window.open(url, '_blank');
  }
}
