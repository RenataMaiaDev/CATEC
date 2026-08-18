import { Component } from '@angular/core';

// tônomei's dedicated WhatsApp line.
const TONOMEI_PHONE = '5585998049463';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {
  // Opens WhatsApp in a new tab with a pre-filled message.
  openWhatsApp(): void {
    const text = encodeURIComponent('Olá! Gostaria de tirar algumas dúvidas e saber mais sobre as soluções da CATEC.');
    const url = `https://api.whatsapp.com/send/?phone=${TONOMEI_PHONE}&text=${text}`;
    window.open(url, '_blank');
  }
}