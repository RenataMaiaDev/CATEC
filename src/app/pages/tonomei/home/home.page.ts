import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { HeroSectionComponent } from '../section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../section/about-section/about-section.component';
import { MoreProductsSectionComponent } from '../section/more-products-section/more-products-section.component';
import { PlansSectionComponent } from '../section/plans-section/plans-section.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    MoreProductsSectionComponent,
    PlansSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-tonomei');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-tonomei');
  }
}
