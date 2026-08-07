import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { OrcamentoModalComponent } from './pages/catec/shared/components/orcamento-modal/orcamento-modal.component';
import { OrcamentoService } from './pages/catec/shared/components/orcamento-modal/orcamento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // OrcamentoModalComponent só é usado dentro de um bloco @defer no template
  // — o Angular detecta isso e separa ele (e o EmailJS) num chunk à parte,
  // carregado só quando o modal é realmente aberto pela primeira vez.
  imports: [RouterOutlet, WhatsappButtonComponent, OrcamentoModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'catec';

  // Só o serviço (leve) é importado aqui — o componente do modal em si
  // (que carrega o EmailJS) é carregado sob demanda via @defer no template,
  // pra não pesar o bundle inicial de LPs que nunca abrem esse formulário.
  protected readonly orcamentoService = inject(OrcamentoService);
}
