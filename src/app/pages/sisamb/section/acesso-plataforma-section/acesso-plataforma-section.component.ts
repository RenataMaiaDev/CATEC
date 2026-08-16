import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

const SISAMB_URL = 'https://sisamb.eco.br/';

@Component({
  selector: 'app-acesso-plataforma-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './acesso-plataforma-section.component.html',
  styleUrl: './acesso-plataforma-section.component.scss',
})
// Direct, low-friction link to the real platform for users who already know
// what SISAMB is (equipes, fiscais, gestores, cidadãos already onboarded).
export class AcessoPlataformaSectionComponent {
  readonly url = SISAMB_URL;

  acessarPlataforma(): void {
    window.open(SISAMB_URL, '_blank', 'noopener,noreferrer');
  }
}
