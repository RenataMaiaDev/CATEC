import { Component } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';
import { CardComponent } from '../../../../components/card/card.component';

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [TonomeiButtonComponent, CardComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
export class MoreProductsSectionComponent {
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
