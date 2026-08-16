import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

const SISAMB_WHATSAPP_PHONE = '5585996157126';

@Component({
  selector: 'app-seguranca-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './seguranca-section.component.html',
  styleUrl: './seguranca-section.component.scss',
})
// "Segurança e confiabilidade" + final CTA, side by side: trust info on the
// left, a highlighted action card on the right.
export class SegurancaSectionComponent {
  readonly itens: string[] = [
    'Aderência total à LGPD',
    'Ambiente de hospedagem protegido',
    'Cópias de segurança automáticas todos os dias',
    'Permissões de acesso por tipo de usuário',
    'Registro completo de todas as ações',
    'Domínio institucional gov.br',
    'Conectado à plataforma Gov.br',
    'Evolução contínua da plataforma',
  ];

  // Repeated 4x so the marquee track always overflows the viewport, even on
  // very wide screens — required for the CSS translateX loop to look seamless.
  readonly itensLoop: string[] = [
    ...this.itens,
    ...this.itens,
    ...this.itens,
    ...this.itens,
  ];

  abrirWhatsApp(): void {
    const text = encodeURIComponent(
      'Olá! Gostaria de saber como implantar o SISAMB no meu município.',
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=${SISAMB_WHATSAPP_PHONE}&text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
}
