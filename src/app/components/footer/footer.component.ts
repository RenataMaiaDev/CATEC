import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FooterTheme = 'tonomei' | 'catec' | 'gestao';

const BRAND_TAGLINES: Record<FooterTheme, string> = {
  tonomei: 'Gestão simples para o microempreendedor.',
  catec: 'Tecnologia de gestão para o seu negócio.',
  gestao: 'Gestão unificada para a sua operação.',
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
    'https://api.whatsapp.com/send/?phone=5585996157126&text=' +
    encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas sobre os serviços da CATEC Soluções.',
    );

  get tagline(): string {
    return BRAND_TAGLINES[this.theme];
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
