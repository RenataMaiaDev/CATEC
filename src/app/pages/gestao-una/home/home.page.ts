import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HeroSectionComponent } from '../shared/section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../shared/section/about-section/about-section.component';
import { MoreProductsSectionComponent } from '../shared/section/more-products-section/more-products-section.component';
import { CtaFinalSectionComponent } from '../shared/section/cta-final-section/cta-final-section.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    MoreProductsSectionComponent,
    CtaFinalSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// Gestão Una home page: assembles the shared sections into the LP.
export class HomePage implements OnInit, OnDestroy {
  // Applies the Gestão Una scrollbar theme while this page is active, and
  // clears any scrollbar theme left over from another LP.
  ngOnInit(): void {
    document.body.classList.remove(
      'scroll-theme-tonomei',
      'scroll-theme-sisamb',
    );
    document.body.classList.add('scroll-theme-gestao');
  }

  // Removes the Gestão Una scrollbar theme when leaving the page.
  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-gestao');
  }
}
