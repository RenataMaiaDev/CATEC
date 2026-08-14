import { Component, OnInit } from '@angular/core';
import { AboutSectionComponent } from '../shared/section/about-section/about-section.component';
import { HeroSectionComponent } from '../shared/section/hero-section/hero-section.component';
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
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// Catec home page: assembles the shared sections into the root LP.
export class HomePage implements OnInit {
  // Clears any scrollbar theme class left over from another LP.
  ngOnInit(): void {
    document.body.classList.remove(
      'scroll-theme-tonomei',
      'scroll-theme-gestao',
      'scroll-theme-sisamb',
    );
  }
}
