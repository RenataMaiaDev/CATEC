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
  // List of 8 images for the rectangular carousel
  entrepreneurImages: string[] = [
    'img-tonomei/vendedora.png',
    'img-tonomei/mecanico.png',
    'img-tonomei/feirante.png',
    'img-tonomei/queijeiro.png',
    'img-tonomei/barbeiro.png',
    'img-tonomei/pedreiro.png',
    'img-tonomei/padeiro.png',
    'img-tonomei/marceneiro.png',
  ];

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
