import { Injectable, signal } from '@angular/core';

// Shared open/close state for the quote request modal, usable from anywhere on the catec LP.
@Injectable({ providedIn: 'root' })
export class OrcamentoService {
  readonly isOpen = signal(false);

  // Opens the modal.
  abrir(): void {
    this.isOpen.set(true);
  }

  // Closes the modal.
  fechar(): void {
    this.isOpen.set(false);
  }
}
