import { Component } from '@angular/core';

// Conteúdo da Política de Privacidade, sem cabeçalho/rodapé de página — usado
// tanto pela rota /politica-de-privacidade (privacy-policy.page) quanto pelo
// modal global (app-privacy-modal), para não duplicar o texto legal em dois
// lugares.
@Component({
  selector: 'app-privacy-content',
  standalone: true,
  templateUrl: './privacy-content.component.html',
  styleUrl: './privacy-content.component.scss',
})
export class PrivacyContentComponent {}
