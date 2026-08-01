import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { HeroSectionComponent } from '../section/hero-section/hero-section.component';
import { AboutSectionComponent } from '../section/about-section/about-section.component';
import { MoreProductsSectionComponent } from '../section/more-products-section/more-products-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    MoreProductsSectionComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
