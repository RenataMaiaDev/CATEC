import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  isMenuOpen = signal<boolean>(false);
  activeSection = signal<string>('sisamb-inicio');

  setActiveSection(sectionId: string, event: Event): void {
    event.preventDefault();

    // Redirects back to the CATEC LP instead of scrolling within the page.
    if (sectionId === 'inicio') {
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

    const headerOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
