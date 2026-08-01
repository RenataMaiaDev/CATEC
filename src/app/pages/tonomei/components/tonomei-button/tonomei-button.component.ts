import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tonomei-button',
  standalone: true,
  templateUrl: './tonomei-button.component.html',
  styleUrl: './tonomei-button.component.scss',
})
export class TonomeiButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
}
