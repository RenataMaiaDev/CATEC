import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsModalService } from '../terms-modal/terms-modal.service';
import { PrivacyModalService } from '../privacy-modal/privacy-modal.service';

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

  private readonly termsModalService = inject(TermsModalService);
  private readonly privacyModalService = inject(PrivacyModalService);

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

  abrirTermos(event: Event): void {
    event.preventDefault();
    this.termsModalService.abrir();
  }

  abrirPrivacidade(event: Event): void {
    event.preventDefault();
    this.privacyModalService.abrir();
  }
}
