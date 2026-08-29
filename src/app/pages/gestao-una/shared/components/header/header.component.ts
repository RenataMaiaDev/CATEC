import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

// Sticky header with a mobile menu and click-driven active-section tracking
// (same pattern already used by the SISAMB header).
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router = inject(Router);

  isMenuOpen = signal<boolean>(false);
  activeSection = signal<string>('gestao-inicio');

  // Marks the clicked link as active and smooth-scrolls to its section.
  // The "catec" link is a special case: it navigates back to the root LP
  // instead of scrolling within the current page (same pattern as the
  // SISAMB header's own "CATEC" link).
  setActiveSection(sectionId: string, event: Event): void {
    event.preventDefault();

    if (sectionId === 'catec') {
      this.closeMenu();
      this.router.navigate(['/']);
      return;
    }

    this.activeSection.set(sectionId);
    this.closeMenu();
    this.scrollToElement(sectionId);
  }

  private scrollToElement(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  // Toggles the mobile menu open/closed.
  toggleMenu(): void {
    this.isMenuOpen.update(state => !state);
  }

  // Closes the mobile menu.
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
