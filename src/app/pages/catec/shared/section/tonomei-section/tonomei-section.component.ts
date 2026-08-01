import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Slide {
  id: string;
  button: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  image: string;
  logo: string;
}

@Component({
  selector: 'app-tonomei-section',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './tonomei-section.component.html',
  styleUrl: './tonomei-section.component.scss',
})
export class TonomeiSectionComponent {
  slides: Slide[] = [
    {
      id: 'tonomei',
      button: 'tônomei',
      title: 'Solução Completa para o Microempreendedor',
      subtitle: 'Gestão & Obrigações Fiscais',
      description:
        'Um sistema desenvolvido para reunir todas as suas obrigações fiscais em um só lugar. Monte seu portfólio de produtos e serviços, mantenha o controle de gastos na ponta do lápis e gerencie o faturamento com facilidade, sem complicação.',
      badge: 'Microempreendedores Individuais (MEI)',
      icon: 'point_of_sale',
      image: 'img/tonomei.png',
      logo: 'img/logo-tonomei.png',
    },
    // {
    //   id: 'sisambe',
    //   button: 'SISAMB',
    //   title: 'Transformação Digital na Gestão Ambiental',
    //   subtitle: 'Cidades, Estados & Consórcios',
    //   description:
    //     'O SISAMB leva a gestão ambiental do seu município, estado ou consórcio para o ambiente digital de forma leve, fácil e intuitiva. Simplifique processos, monitore indicadores ecológicos e modernize a administração pública ambiental.',
    //   badge: 'Órgãos de Gestão Ambiental e Consórcios',
    //   icon: 'eco',
    //   image: 'img/hero.png',
    //   logo: 'img/logo-sisamb.png',
    // },
    // {
    //   id: 'gestao',
    //   button: 'Gestão Una',
    //   title: 'Gestão Eficiente para o Setor Público',
    //   subtitle: 'Serviços Públicos Integrados',
    //   description:
    //     'Um sistema projetado para gerir as principais áreas do serviço público de maneira prática, inteligente, acessível, econômica, inclusiva e moderna. Otimize rotinas administrativas e melhore o atendimento ao cidadão.',
    //   badge: 'Prefeituras e Secretarias Públicas',
    //   icon: 'account_balance',
    //   image: 'img/hero.png',
    //   logo: 'img/logo-gestao-una.png',
    // },
  ];
  activeSlideIndex = signal<number>(0);

  // Variáveis para controle do Touch / Swipe
  private touchStartX = 0;
  private touchEndX = 0;

  setActiveSlide(index: number): void {
    this.activeSlideIndex.set(index);
  }

  nextSlide(): void {
    this.activeSlideIndex.update((idx) => (idx + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.activeSlideIndex.update(
      (idx) => (idx - 1 + this.slides.length) % this.slides.length,
    );
  }

  // Métodos do Touch Event
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50; // Distância mínima em pixels para detectar o deslize
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Deslizou para a esquerda -> Próximo Slide
        this.nextSlide();
      } else {
        // Deslizou para a direita -> Slide Anterior
        this.prevSlide();
      }
    }
  }

  openTonoMei(): void {}
}
