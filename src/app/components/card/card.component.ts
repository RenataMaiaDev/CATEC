import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../pages/catec/shared/components/button/button.component'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  icon = input<string>('');
  title = input<string>('');
  description = input<string>('');

  // Opções para controlar o botão
  showButton = input<boolean>(false);
  buttonText = input<string>('Saiba Mais');
  buttonVariant = input<'primary' | 'secondary' | 'outline'>('outline');

  // Evento emitido quando o botão interno for clicado
  buttonClick = output<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
