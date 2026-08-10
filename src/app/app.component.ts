import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';
import { TermsModalService } from './components/terms-modal/terms-modal.service';
import { PrivacyModalComponent } from './components/privacy-modal/privacy-modal.component';
import { PrivacyModalService } from './components/privacy-modal/privacy-modal.service';
import { OrcamentoModalComponent } from './pages/catec/shared/components/orcamento-modal/orcamento-modal.component';
import { OrcamentoService } from './pages/catec/shared/components/orcamento-modal/orcamento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // OrcamentoModalComponent, TermsModalComponent e PrivacyModalComponent só
  // são usados dentro de um bloco @defer no template — o Angular detecta
  // isso e separa cada um num chunk à parte, carregado só quando o
  // respectivo modal é aberto pela primeira vez.
  imports: [
    RouterOutlet,
    WhatsappButtonComponent,
    OrcamentoModalComponent,
    TermsModalComponent,
    PrivacyModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'catec';

  // Só o serviço (leve) é importado aqui — o componente do modal em si é
  // carregado sob demanda via @defer no template, pra não pesar o bundle
  // inicial de LPs que nunca abrem esse modal.
  protected readonly orcamentoService = inject(OrcamentoService);
  protected readonly termsModalService = inject(TermsModalService);
  protected readonly privacyModalService = inject(PrivacyModalService);
}
