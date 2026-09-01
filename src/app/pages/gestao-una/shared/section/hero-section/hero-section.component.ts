import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { OrcamentoService } from '../../../../catec/shared/components/orcamento-modal/orcamento.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private readonly orcamentoService = inject(OrcamentoService);

  // Opens the same quote-request form used on the catec/SISAMB LPs.
  abrirAgendamento(): void {
    this.orcamentoService.abrir('gestao');
  }
}
