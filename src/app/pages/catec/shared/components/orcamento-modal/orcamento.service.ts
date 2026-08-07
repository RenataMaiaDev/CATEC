import { Injectable, signal } from '@angular/core';

// Controla a abertura do app-orcamento-modal a partir de qualquer lugar da
// LP catec (Hero, Nossos Serviços, etc.), sem precisar de uma instância do
// modal aninhada dentro de cada seção — o que causava um bug de z-index
// (seções com z-index próprio "prendiam" o modal atrás de outros elementos
// fixos da página, como o botão de WhatsApp).
@Injectable({ providedIn: 'root' })
export class OrcamentoService {
  readonly isOpen = signal(false);

  abrir(): void {
    this.isOpen.set(true);
  }

  fechar(): void {
    this.isOpen.set(false);
  }
}
