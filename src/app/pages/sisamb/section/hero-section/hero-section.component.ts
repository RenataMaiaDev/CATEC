import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

const SISAMB_LOGIN_URL = 'https://sisamb.eco.br/auth/login';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  // Opens the SISAMB platform login in a new tab.
  acessarSisamb(): void {
    window.open(SISAMB_LOGIN_URL, '_blank', 'noopener,noreferrer');
  }
}
