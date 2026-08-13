import { afterNextRender, Component, OnDestroy, signal } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';

interface AdvantageItem {
  icon: string;
  title: string;
  description: string;
  image: string;
}

// The 8 feature cards. Only 4 dedicated images exist, so pairs of
// thematically-related features share the same lateral image. The images
// are purely decorative here (the card text already conveys the meaning),
// so they're rendered with an empty alt in the template.
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: 'receipt_long',
    title: 'Emissão e controle DAS',
    description:
      'Gerenciamos suas guias automaticamente. Sem risco, sem multas, sem atrasos.',
    image: 'img-tonomei/DAS.webp',
  },
  {
    icon: 'description',
    title: 'Declaração anual simplificada',
    description:
      'Cumpra a DASN-SIMEI direto pela plataforma, sem depender de terceiros.',
    image: 'img-tonomei/DAS.webp',
  },
  {
    icon: 'storefront',
    title: 'Vitrine integrada',
    description:
      'Aqui você será visto, novos clientes, novos mercados, mais negócios para dentro de sua empresa.',
    image: 'img-tonomei/vitrine.webp',
  },
  {
    icon: 'inventory_2',
    title: 'Controle de estoque',
    description:
      'Cadastre seus produtos e serviços e mantenha controle total de seus estoques e prazos de validade.',
    image: 'img-tonomei/vitrine.webp',
  },
  {
    icon: 'point_of_sale',
    title: 'Sistema de vendas integrado',
    description:
      'Registre seus pedidos e acompanhe todas as suas vendas em um único lugar, direto pela plataforma.',
    image: 'img-tonomei/vendas.webp',
  },
  {
    icon: 'event',
    title: 'Feiras e eventos',
    description:
      'Permite que você tenha acesso as feiras e eventos para vender seus produtos e serviços através de uma reserva simples e descomplicada.',
    image: 'img-tonomei/vendas.webp',
  },
  {
    icon: 'school',
    title: 'Trilha do conhecimento',
    description:
      'Aqui, de qualquer lugar, você pode fazer seu curso, seu treinamento e melhorar ainda mais seu negócio.',
    image: 'img-tonomei/curso.webp',
  },
  {
    icon: 'verified',
    title: 'Validação de documentos',
    description:
      'A ferramenta tônomei analisa e valida seus documentos, ou seja, sua validade, sua origem e demais itens de segurança.',
    image: 'img-tonomei/curso.webp',
  },
];

const AUTOPLAY_INTERVAL_MS = 4500;

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [TonomeiButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "Conheça as Vantagens" section: synced image + card carousel and sign-up CTA.
export class MoreProductsSectionComponent implements OnDestroy {
  readonly advantages = ADVANTAGES;
  readonly activeIndex = signal(0);

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Timers touch the browser only; keep them out of any server render.
    afterNextRender(() => this.startAutoplay());
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // Jumps straight to the given advantage and restarts the autoplay timer,
  // so a manual pick isn't immediately overridden by the next tick.
  goTo(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.timerId !== null) return;
    this.timerId = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.advantages.length);
    }, AUTOPLAY_INTERVAL_MS);
  }

  private stopAutoplay(): void {
    if (this.timerId === null) return;
    clearInterval(this.timerId);
    this.timerId = null;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
