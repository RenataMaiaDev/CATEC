import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

const GESTAO_WHATSAPP_PHONE = '5585996157126';

@Component({
  selector: 'app-cta-final-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cta-final-section.component.html',
  styleUrl: './cta-final-section.component.scss',
})
// Final call-to-action, same WhatsApp pattern used across the rest of the site.
export class CtaFinalSectionComponent {
  abrirWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de saber como o Gestão Una pode ajudar minha instituição.',
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=${GESTAO_WHATSAPP_PHONE}&text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
}
