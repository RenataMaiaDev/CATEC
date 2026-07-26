import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);
  isDropdownOpen = signal<boolean>(false);
  
  // Novo estado para controlar se a página sofreu scroll
  isScrolled = signal<boolean>(false);

  // Monitora a rolagem da página
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Se rolou mais de 20px para baixo, ativa o estado scrolled
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(state => !state);
    if (!this.isMenuOpen()) {
      this.isDropdownOpen.set(false);
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update(state => !state);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.isDropdownOpen.set(false);
  }
}