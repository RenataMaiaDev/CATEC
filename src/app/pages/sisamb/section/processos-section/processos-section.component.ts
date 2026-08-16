import { Component } from '@angular/core';

@Component({
  selector: 'app-processos-section',
  standalone: true,
  imports: [],
  templateUrl: './processos-section.component.html',
  styleUrl: './processos-section.component.scss',
})
// Auto-scrolling marquee of the process types the platform supports.
export class ProcessosSectionComponent {
  readonly processos: string[] = [
    'Licenciamento Ambiental',
    'Licenciamento para Construção',
    'Alvará de Funcionamento',
    'Anuência Ambiental',
  ];

  // Repeated 4x so the marquee track always overflows the viewport, even on
  // very wide screens — required for the CSS translateX loop to look seamless.
  readonly processosLoop: string[] = [
    ...this.processos,
    ...this.processos,
    ...this.processos,
    ...this.processos,
  ];
}
