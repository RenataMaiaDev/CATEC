import { Component } from '@angular/core';

@Component({
  selector: 'app-image-carousel-section',
  standalone: true,
  imports: [],
  templateUrl: './image-carousel-section.component.html',
  styleUrl: './image-carousel-section.component.scss',
})
// Infinite image ticker, same technique as tonomei's hero carousel.
export class ImageCarouselSectionComponent {
  images: string[] = [
    'images-sisamb/1.webp',
    'images-sisamb/2.webp',
    'images-sisamb/3.webp',
    'images-sisamb/4.webp',
    'images-sisamb/5.webp',
    'images-sisamb/6.webp',
  ];
}
