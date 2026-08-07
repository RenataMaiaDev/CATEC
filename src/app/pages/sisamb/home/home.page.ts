import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-sisamb');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-sisamb');
  }
}
