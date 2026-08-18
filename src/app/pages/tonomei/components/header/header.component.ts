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

  // Sets 'tonomei-inicio' as active by default on the tônomei LP
  activeSection = signal<string>('tonomei-inicio');

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  setActiveSection(sectionId: string, event?: Event): void {
    // For the Login link, we don't intercept with preventDefault so the <a> tag can navigate normally
    if (sectionId === 'login') {
      this.closeMenu();
      return;
    }

    if (event) {
      event.preventDefault(); // Prevents the abrupt native jump of # anchors
    }

    this.activeSection.set(sectionId);
    this.closeMenu();

    this.scrollToElement(sectionId);
  }

  private scrollToElement(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const headerOffset = 90; // Offset for the header height + breathing room
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
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
