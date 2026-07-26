import { Component } from '@angular/core';
import { HomePage } from './pages/catec/home/home.page';
import { HeaderComponent } from './pages/catec/shared/components/header/header.component';
import { WhatsappButtonComponent } from './pages/catec/shared/components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePage, HeaderComponent, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'catec';
}
