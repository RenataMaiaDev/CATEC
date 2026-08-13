import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsModalService } from '../terms-modal/terms-modal.service';
import { PrivacyModalService } from '../privacy-modal/privacy-modal.service';

export type FooterTheme = 'tonomei' | 'catec' | 'gestao' | 'sisamb';

// Tagline shown under the brand logo in the footer, per brand. Lines are
// separated by \n and rendered with `white-space: pre-line`.
const FOOTER_TAGLINES: Record<FooterTheme, string> = {
  tonomei:
    'O tônomei é patenteado pelo INPI\n' +
    'Nosso sistema possui Certificação pela ABES (em todo o território nacional)',
  catec: 'Gestão Inovadora para os Empreendedores do Brasil',
  gestao: 'Gestão Inovadora para os Empreendedores do Brasil',
  sisamb: 'Gestão Inovadora para os Empreendedores do Brasil',
};

// Per-brand logo shown in the footer, in place of the "CATEC Soluções" text.
// The footer background is always dark, so each entry points at a
// light/white-friendly logo asset. Gestão Una and SISAMB only have their
// regular (dark-text) logo, so they're rendered with a CSS invert filter
// to read well on the dark background.
const FOOTER_LOGOS: Record<
  FooterTheme,
  { src: string; alt: string; invert: boolean }
> = {
  tonomei: { src: 'img-tonomei/logo.png', alt: 'tônomei', invert: false },
  catec: {
    src: 'img/logo-catec-solucoes1.png',
    alt: 'CATEC Soluções',
    invert: false,
  },
  gestao: {
    src: 'img/logo-gestao-una.png',
    alt: 'Gestão Una',
    invert: true,
  },
  sisamb: {
    src: 'img/logo-sisamb.png',
    alt: 'SISAMB',
    invert: true,
  },
};

// Contact e-mail shown in the footer, per brand. Only tônomei and SISAMB
// have a confirmed brand-specific address so far; catec/gestão keep the
// address that was already used here before per-brand emails existed.
const FOOTER_EMAILS: Record<FooterTheme, string> = {
  tonomei: 'tonomei@catecsolucoes.com.br',
  catec: 'contato@tonomei.com.br',
  gestao: 'contato@tonomei.com.br',
  sisamb: 'sisamb.eco@catecsolucoes.com.br',
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

  // Returns the logo to show for the current brand theme.
  get logo() {
    return FOOTER_LOGOS[this.theme];
  }

  // Pre-built WhatsApp link with the default contact message.
  readonly whatsappUrl =
    'https://api.whatsapp.com/send/?phone=5585998049463&text=' +
    encodeURIComponent(
      'Olá! Gostaria de tirar algumas dúvidas sobre os serviços da CATEC Soluções.',
    );

  // Returns the footer tagline for the current brand theme.
  get tagline(): string {
    return FOOTER_TAGLINES[this.theme];
  }

  // Returns the contact e-mail for the current brand theme.
  get email(): string {
    return FOOTER_EMAILS[this.theme];
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
