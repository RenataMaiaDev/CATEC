import { Component } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';

@Component({
  selector: 'app-plans-section',
  standalone: true,
  imports: [TonomeiButtonComponent],
  templateUrl: './plans-section.component.html',
  styleUrl: './plans-section.component.scss',
})
// Pricing section: free/intermediate/advanced plans.
export class PlansSectionComponent {
  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
