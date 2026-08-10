import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../pages/catec/shared/components/button/button.component';
import { PrivacyContentComponent } from '../../pages/legal/privacy-policy/privacy-content.component';
import { PrivacyModalService } from './privacy-modal.service';

@Component({
  selector: 'app-privacy-modal',
  standalone: true,
  imports: [ButtonComponent, PrivacyContentComponent],
  templateUrl: './privacy-modal.component.html',
  styleUrl: './privacy-modal.component.scss',
})
export class PrivacyModalComponent {
  private readonly privacyModalService = inject(PrivacyModalService);
  private readonly router = inject(Router);
  readonly isOpen = this.privacyModalService.isOpen;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  fechar(): void {
    this.privacyModalService.fechar();
  }

  abrirPaginaDedicada(): void {
    this.fechar();
    this.router.navigate(['/politica-de-privacidade']);
  }
}
