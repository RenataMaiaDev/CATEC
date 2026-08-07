import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { OrcamentoService } from '../../components/orcamento-modal/orcamento.service';

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
export class MoreProductsSectionComponent {
  private readonly orcamentoService = inject(OrcamentoService);

  abrirOrcamento(): void {
    this.orcamentoService.abrir();
  }
}
