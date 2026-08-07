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
