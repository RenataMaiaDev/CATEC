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
    'images-tonomei/motoboy.webp',
    'images-tonomei/mecanico.webp',
    'images-tonomei/feirante.webp',
    'images-tonomei/mercado.webp',
    'images-tonomei/barbeiro.webp',
    'images-tonomei/pedreiro.webp',
    'images-tonomei/padeiro.webp',
    'images-tonomei/manicure.webp',
    'images-tonomei/pipoqueiro.webp',
    'images-tonomei/pescador.webp',
  ];

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
