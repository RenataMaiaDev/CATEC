import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { OrcamentoService } from '../../components/orcamento-modal/orcamento.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private readonly orcamentoService = inject(OrcamentoService);

  abrirOrcamento(): void {
    this.orcamentoService.abrir();
  }
}
