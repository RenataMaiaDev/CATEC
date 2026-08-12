import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
// SISAMB home page (still a work in progress).
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
