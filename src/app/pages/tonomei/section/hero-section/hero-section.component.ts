import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TonomeiButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  // List of images for the rectangular carousel
  entrepreneurImages: string[] = [
    'img-tonomei/vendedora.webp',
    'img-tonomei/mecanico.webp',
    'img-tonomei/feirante.webp',
    'img-tonomei/queijeiro.webp',
    'img-tonomei/barbeiro.webp',
    'img-tonomei/pedreiro.webp',
    'img-tonomei/padeiro.webp',
    'img-tonomei/marceneiro.webp',
    'img-tonomei/pipoqueiro.webp',
    'img-tonomei/pescador.webp',
  ];

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
