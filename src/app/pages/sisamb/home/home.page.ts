import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HeroSectionComponent } from '../section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../section/about-section/about-section.component';
import { ProcessosSectionComponent } from '../section/processos-section/processos-section.component';
import { MoreProductsSectionComponent } from '../section/more-products-section/more-products-section.component';
import { ComoContratarSectionComponent } from '../section/como-contratar-section/como-contratar-section.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProcessosSectionComponent,
    MoreProductsSectionComponent,
    ComoContratarSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// SISAMB home page: assembles the shared sections into the SISAMB LP.
export class HomePage implements OnInit, OnDestroy {
  // Applies the SISAMB scrollbar theme while this page is active.
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-sisamb');
  }

  // Removes the SISAMB scrollbar theme when leaving the page.
  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-sisamb');
  }
}
