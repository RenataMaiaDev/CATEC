import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// Sticky header with a mobile menu and a useful-links dropdown.
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
  isScrolled = signal<boolean>(false);

  // Tracks scroll position to toggle the header's scrolled state.
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  // Toggles the mobile menu open/closed.
  toggleMenu(): void {
    this.isMenuOpen.update(state => !state);
    if (!this.isMenuOpen()) {
      this.isDropdownOpen.set(false);
    }
  }

  // Toggles the "useful links" dropdown.
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update(state => !state);
  }

  // Closes the mobile menu and dropdown.
  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.set(false);
  }

  // Closes the dropdown when clicking anywhere outside it.
  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.isDropdownOpen.set(false);
  }
}
