import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';

interface Dor {
  title: string;
  description: string;
}

@Component({
  selector: 'app-problema-section',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './problema-section.component.html',
  styleUrl: './problema-section.component.scss',
})
// "O problema hoje": the pain points a secretaria faces without the platform.
export class ProblemaSectionComponent {
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  readonly dores: Dor[] = [
    {
      title: 'Filas presenciais sem fim',
      description:
        'Cidadão precisa ir até a secretaria para qualquer solicitação',
    },
    {
      title: 'Processos em papel perdidos',
      description: 'Sem rastreabilidade, histórico ou controle confiável',
    },
    {
      title: 'Fiscais sobrecarregados',
      description: 'Distribuição manual de tarefas sem controle de prazo',
    },
    {
      title: 'Zero transparência',
      description: 'Cidadão não consegue acompanhar o status da solicitação',
    },
    {
      title: 'Retrabalho nos documentos',
      description: 'Análise totalmente manual sem validação automática',
    },
    {
      title: 'Gestores no escuro',
      description: 'Nenhum painel de indicadores ou relatório gerencial',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const el = this.grid()?.nativeElement;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        el.classList.add('in-view');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
    });
  }
}
