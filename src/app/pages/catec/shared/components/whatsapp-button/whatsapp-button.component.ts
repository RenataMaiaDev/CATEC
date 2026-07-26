import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {

  openWhatsApp(): void {
    const text = encodeURIComponent('Olá! Gostaria de tirar algumas dúvidas e saber mais sobre as soluções da CATEC.');
    const url = `https://api.whatsapp.com/send/?phone=5585996157126&text=${text}`;
    window.open(url, '_blank');
  }

}