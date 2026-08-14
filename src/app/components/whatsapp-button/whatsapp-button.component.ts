import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// Default CATEC Soluções WhatsApp line, used on every route except tônomei.
const DEFAULT_PHONE = '5585996157126';

// tônomei has its own dedicated WhatsApp line.
const TONOMEI_PHONE = '5585998049463';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {
  private readonly router = inject(Router);

  // Opens WhatsApp in a new tab with a pre-filled message, using the
  // tônomei number while browsing tônomei pages.
  openWhatsApp(): void {
    const phone = this.router.url.startsWith('/tonomei')
      ? TONOMEI_PHONE
      : DEFAULT_PHONE;
    const text = encodeURIComponent('Olá! Gostaria de tirar algumas dúvidas e saber mais sobre as soluções da CATEC.');
    const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${text}`;
    window.open(url, '_blank');
  }

}