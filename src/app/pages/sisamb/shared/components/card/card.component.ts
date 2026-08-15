import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
// Reusable icon + title + description card for the SISAMB LP, with an optional checklist.
export class CardComponent {
  icon = input<string>('');
  title = input<string>('');
  description = input<string>('');
  bullets = input<string[]>([]);
}
