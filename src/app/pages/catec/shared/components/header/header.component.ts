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

  // Atualiza o item ativo e rola até a seção compensando o Header fixo
  setActiveSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault(); // Previne o salto brusco nativo da tag <a>
    }

    this.activeSection.set(sectionId);
    this.closeMenu();

    // Rola até o topo caso seja a primeira seção
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Busca o elemento da seção pelo ID e rola compensando a altura do menu
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 90; // Desconto em pixels para a altura do Header + folga
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
