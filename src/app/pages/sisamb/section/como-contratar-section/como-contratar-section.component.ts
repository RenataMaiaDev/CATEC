import {
  afterNextRender,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

interface Passo {
  numero: string;
  icon: string;
  title: string;
  description: string;
}

const SISAMB_EMAIL = 'sisamb.eco@catecsolucoes.com.br';

@Component({
  selector: 'app-como-contratar-section',
  standalone: true,
  imports: [],
  templateUrl: './como-contratar-section.component.html',
  styleUrl: './como-contratar-section.component.scss',
})
// "Como contratar": the real commercial process for hiring SISAMB, shown as
// an editorial intro (left) + vertical timeline (right).
export class ComoContratarSectionComponent {
  private readonly timeline = viewChild<ElementRef<HTMLElement>>('timeline');

  readonly email = SISAMB_EMAIL;

  readonly passos: Passo[] = [
    {
      numero: '01',
      icon: 'co_present',
      title: 'Demonstração',
      description: 'Apresentação técnica personalizada para sua equipe',
    },
    {
      numero: '02',
      icon: 'request_quote',
      title: 'Proposta comercial',
      description: 'Adequação jurídica incluída na proposta',
    },
    {
      numero: '03',
      icon: 'rocket_launch',
      title: 'Implantação',
      description: 'Configuração do sistema para o seu município',
    },
    {
      numero: '04',
      icon: 'school',
      title: 'Treinamento',
      description: 'Capacitação completa de toda a equipe',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const el = this.timeline()?.nativeElement;
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
