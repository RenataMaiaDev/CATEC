import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('scroll-theme-gestao');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('scroll-theme-gestao');
  }
}
