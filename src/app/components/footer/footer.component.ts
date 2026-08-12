import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsModalService } from '../terms-modal/terms-modal.service';
import { PrivacyModalService } from '../privacy-modal/privacy-modal.service';

export type FooterTheme = 'tonomei' | 'catec' | 'gestao';

// Shared tagline shown under the CATEC Soluções name in the footer, across all brands.
const FOOTER_TAGLINE = 'Gestão Inovadora para os Empreendedores do Brasil';

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

  // Pre-built WhatsApp link with the default contact message.
  readonly whatsappUrl =
    'https://api.whatsapp.com/send/?phone=5585998049463&text=' +
    encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas sobre os serviços da CATEC Soluções.',
    );

  // Returns the shared footer tagline.
  get tagline(): string {
    return FOOTER_TAGLINE;
  }

  // Returns the current year for the copyright line.
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // Opens the Terms of Use modal.
  abrirTermos(event: Event): void {
    event.preventDefault();
    this.termsModalService.abrir();
  }

  // Opens the Privacy Policy modal.
  abrirPrivacidade(event: Event): void {
    event.preventDefault();
    this.privacyModalService.abrir();
  }
}
