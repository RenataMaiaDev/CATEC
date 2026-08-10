import { Injectable, signal } from '@angular/core';

// Controla a abertura do app-terms-modal a partir de qualquer lugar do site
// (rodapé de qualquer marca, formulário de orçamento etc.), sem precisar de
// uma instância do modal aninhada em cada componente que precisa abri-lo.
@Injectable({ providedIn: 'root' })
export class TermsModalService {
  readonly isOpen = signal(false);

  abrir(): void {
    this.isOpen.set(true);
  }

  fechar(): void {
    this.isOpen.set(false);
  }
}
