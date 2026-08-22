import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sisamb-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
// Reusable pill-shaped button with primary/secondary/outline variants, for the SISAMB LP.
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  type = input<'button' | 'submit'>('button');
}
