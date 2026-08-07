import { Component, OnInit } from '@angular/core';
import { AboutSectionComponent } from '../shared/section/about-section/about-section.component';
import { HeroSectionComponent } from '../shared/section/hero-section/hero-section.component';
import { MoreProductsSectionComponent } from '../shared/section/more-products-section/more-products-section.component';
import { TonomeiSectionComponent } from '../shared/section/tonomei-section/tonomei-section.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    TonomeiSectionComponent,
    MoreProductsSectionComponent,
    FooterComponent,
  ], // Importando os componentes reutilizáveis
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    // Catec é a marca padrão (cor base da barra de rolagem) — só garante
    // que não sobrou classe de outra LP no body.
    document.body.classList.remove(
      'scroll-theme-tonomei',
      'scroll-theme-gestao',
      'scroll-theme-sisamb',
    );
  }
}
