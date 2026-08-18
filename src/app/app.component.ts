import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';
import { TermsModalService } from './components/terms-modal/terms-modal.service';
import { PrivacyModalComponent } from './components/privacy-modal/privacy-modal.component';
import { PrivacyModalService } from './components/privacy-modal/privacy-modal.service';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Modal components are lazy-loaded via @defer in the template.
  imports: [
    RouterOutlet,
    WhatsappButtonComponent,
    TermsModalComponent,
    PrivacyModalComponent,
    CookieConsentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tonomei';

  // Services drive the @defer blocks that lazy-load each modal.
  protected readonly termsModalService = inject(TermsModalService);
  protected readonly privacyModalService = inject(PrivacyModalService);
}
