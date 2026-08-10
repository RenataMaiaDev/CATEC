import { Component } from '@angular/core';

// Conteúdo dos Termos de Uso, sem cabeçalho/rodapé de página — usado tanto
// pela rota /termos-de-uso (terms-of-use.page) quanto pelo modal global
// (app-terms-modal), para não duplicar o texto legal em dois lugares.
@Component({
  selector: 'app-terms-content',
  standalone: true,
  templateUrl: './terms-content.component.html',
  styleUrl: './terms-content.component.scss',
})
export class TermsContentComponent {}
