import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);
  isDropdownOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  // Define a seção ativa por padrão (ex: 'inicio')
  activeSection = signal<string>('inicio');

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  // Atualiza o item ativo ao clicar
  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
    if (!this.isMenuOpen()) {
      this.isDropdownOpen.set(false);
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update((state) => !state);
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
