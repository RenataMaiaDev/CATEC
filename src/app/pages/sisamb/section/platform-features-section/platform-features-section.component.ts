import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

interface PlatformFeature {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-platform-features-section',
  standalone: true,
  imports: [],
  templateUrl: './platform-features-section.component.html',
  styleUrl: './platform-features-section.component.scss',
})
// "Recursos da plataforma" section: a compact grid of platform-wide capabilities.
export class PlatformFeaturesSectionComponent {
  private readonly featuresGrid =
    viewChild<ElementRef<HTMLElement>>('featuresGrid');

  readonly features: PlatformFeature[] = [
    { icon: 'smart_toy', label: 'Inteligência Artificial em cada etapa' },
    { icon: 'cloud_done', label: 'Histórico de processos em nuvem' },
    { icon: 'summarize', label: 'Relatórios on-line e em PDF' },
    { icon: 'notifications_active', label: 'Notificações automáticas por prazo' },
    { icon: 'draw', label: 'Assinatura eletrônica para todos os usuários' },
    { icon: 'dashboard', label: 'Dashboard com painéis analíticos e sintéticos' },
    { icon: 'wifi_off', label: 'Acesso e procedimentos disponíveis offline' },
    { icon: 'verified', label: 'Emissão de licenças direto na plataforma' },
    { icon: 'badge', label: 'Cadastro unificado dos agentes envolvidos' },
    { icon: 'gavel', label: 'Leis atualizadas e resumidas para fácil compreensão' },
  ];

  constructor() {
    afterNextRender(() => {
      const grid = this.featuresGrid()?.nativeElement;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        grid.classList.add('in-view');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            grid.classList.add('in-view');
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(grid);
    });
  }
}
