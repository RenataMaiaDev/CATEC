import { Injectable, signal } from '@angular/core';

export type MarcaOrcamento = 'catec' | 'sisamb';

// Shared open/close state for the quote request modal, usable from any brand's LP.
// The `marca` picks which backend endpoint and email template the submission uses.
@Injectable({ providedIn: 'root' })
export class OrcamentoService {
  readonly isOpen = signal(false);
  readonly marca = signal<MarcaOrcamento>('catec');

  // Opens the modal for the given brand (defaults to catec).
  abrir(marca: MarcaOrcamento = 'catec'): void {
    this.marca.set(marca);
    this.isOpen.set(true);
  }

  // Closes the modal.
  fechar(): void {
    this.isOpen.set(false);
  }
}
