import { Component } from '@angular/core';

interface EixoItem {
  icon: string;
  title: string;
  description: string;
}

const EIXOS: EixoItem[] = [
  {
    icon: 'school',
    title: 'Gestão Educacional',
    description:
      'Cultivar mentes brilhantes requer uma gestão educacional que inspire, capacite e transforme, moldando não apenas alunos, mas também o amanhã que todos compartilhamos.',
  },
  {
    icon: 'assignment',
    title: 'Gestão de Processos Administrativos',
    description:
      'Na eficiência dos processos administrativos reside a base sólida que sustenta o crescimento organizacional, transformando desafios em oportunidades.',
  },
  {
    icon: 'local_hospital',
    title: 'Gestão da Saúde Pública',
    description:
      'Promover uma gestão da saúde pública eficaz e humanizada, centrada na prevenção, acesso universal, equidade e integração de serviços, visando o bem-estar coletivo.',
  },
  {
    icon: 'lightbulb',
    title: 'Arrecadação Inteligente',
    description:
      'A arrecadação inteligente não apenas coleta recursos, mas também impulsiona o desenvolvimento sustentável, canalizando investimentos para áreas que moldam um futuro próspero.',
  },
  {
    icon: 'gavel',
    title: 'Processos Jurídicos Otimizados',
    description:
      'Na otimização dos processos jurídicos, encontramos a equação perfeita entre justiça e eficiência, garantindo que cada decisão contribua para uma sociedade mais justa e equitativa.',
  },
  {
    icon: 'eco',
    title: 'Processos Ambientais',
    description:
      'Nossa responsabilidade ambiental reflete-se nos processos que implementamos; a harmonia entre a atividade humana e a preservação do meio ambiente é a essência de um progresso duradouro.',
  },
];

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "Principais Eixos" section: hover-reveal grid, same model as tônomei's
// "Conheça as Vantagens" section.
export class MoreProductsSectionComponent {
  readonly eixos = EIXOS;
}
