import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// Gestão Una home page (still a work in progress).
export class HomePage implements OnInit, OnDestroy {
  // Applies the Gestão Una scrollbar theme while this page is active.
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-gestao');
  }

  // Removes the Gestão Una scrollbar theme when leaving the page.
  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-gestao');
  }
}
