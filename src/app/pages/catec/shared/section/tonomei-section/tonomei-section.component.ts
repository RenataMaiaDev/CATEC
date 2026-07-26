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
      button: 'Tônomei',
      title: 'Gestão de Vendas & Faturamento',
      subtitle: 'Vendas x Gastos',
      description:
        'Registre suas vendas em segundos, acompanhe o histórico financeiro completo e saiba exatamente quanto está entrando no seu caixa. Tenha previsibilidade sobre os custos da sua empresa, compare resultados mês a mês e elimine a bagunça dos papéis com relatórios automáticos.',
      badge: 'Controle de Gastos em Tempo Real',
      icon: 'point_of_sale',
      image: 'img/hero.png',
      logo: 'img/logo-tonomei.png',
    },
    {
      id: 'sisambe',
      button: 'SISAMB',
      title: 'Vitrine Virtual para alavancar seu negócio',
      subtitle: 'Catálogo Digital',
      description:
        'Crie uma vitrine online profissional para expor seus produtos e serviços de forma simples e atrativa. Compartilhe o link do seu catálogo diretamente pelo WhatsApp e redes sociais, permitindo que seus clientes façam pedidos de maneira rápida, prática e sem intermediários.',
      badge: 'Divulgação & Vendas Online',
      icon: 'storefront',
      image: 'img/hero.png',
      logo: 'img/logo-sisamb.png',
    },
    {
      id: 'gestao',
      button: 'Gestão Una',
      title: 'Rotina MEI 100% Organizada e sem complicações',
      subtitle: 'Obrigas e Prazos',
      description:
        'Centralize todas as obrigações do seu microempreendimento em um só lugar. Acompanhe datas de pagamento das guias DAS, organize compras e vendas para a Declaração Anual (DASN-SIMEI) e mantenha seu CNPJ sempre regularizado sem surpresas no fim do ano.',
      badge: 'Tranquilidade para o Empreendedor',
      icon: 'assignment_turned_in',
      image: 'img/hero.png',
      logo: 'img/logo-gestao-una.png',
    },
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

  openTonoMei(): void {
    window.open(
      'https://api.whatsapp.com/send/?phone=5585996157126&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20TônoMEI',
      '_blank',
    );
  }
}
