import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

  openWhatsApp(): void {
    const url = 'https://api.whatsapp.com/send/?phone=5585996157126&text&type=phone_number&app_absent=0';
    window.open(url, '_blank');
  }

}