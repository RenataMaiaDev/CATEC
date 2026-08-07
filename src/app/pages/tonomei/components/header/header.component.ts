import { Component, signal, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  isMenuOpen = signal<boolean>(false);
  isDropdownOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  // Define 'tonomei-inicio' como ativo por padrão na LP do tônomei
  activeSection = signal<string>('tonomei-inicio');

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  setActiveSection(sectionId: string, event?: Event): void {
    // Para o link de Login, não interceptamos com preventDefault para permitir a navegação da tag <a>
    if (sectionId === 'login') {
      this.closeMenu();
      return;
    }

    if (event) {
      event.preventDefault(); // Impede o salto automático bruto das âncoras #
    }

    this.activeSection.set(sectionId);
    this.closeMenu();

    // 1. REDIRECIONA PARA A CATEC (Apenas ao clicar no link 'inicio' / CATEC)
    if (sectionId === 'inicio') {
      const isHome =
        this.router.url === '/' || this.router.url.startsWith('/#');
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.router.navigate(['/']); // Redireciona para a CATEC
      }
      return;
    }

    // 2. DEMAIS BOTÕES DO TÔNOMEI (Rola estritamente dentro da página atual)
    this.scrollToElement(sectionId);
  }

  private scrollToElement(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const headerOffset = 90; // Desconto da altura do Header + respiro
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
