import { Component } from '@angular/core';

interface Modulo {
  icon: string;
  name: string;
  tagline: string;
  description: string;
}

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "A solução": the six real modules that make up the SISAMB platform.
export class MoreProductsSectionComponent {
  readonly modulos: Modulo[] = [
    {
      icon: 'support_agent',
      name: 'Central do Cidadão',
      tagline: 'Atendimento 100% online',
      description:
        'O cidadão resolve tudo pela internet, com acompanhamento em tempo real de cada solicitação.',
    },
    {
      icon: 'smart_toy',
      name: 'Análise Inteligente',
      tagline: 'Triagem automática de documentos',
      description:
        'A plataforma faz a primeira triagem dos documentos antes mesmo de chegarem ao fiscal.',
    },
    {
      icon: 'dashboard',
      name: 'Indicadores Gerenciais',
      tagline: 'Visão geral em tempo real',
      description:
        'Prazos, equipe e indicadores num único painel, para decisões mais rápidas e embasadas.',
    },
    {
      icon: 'fact_check',
      name: 'Vistoria e Pareceres',
      tagline: 'Fiscalização com rastreabilidade',
      description:
        'Fiscais analisam, decidem e registram cada etapa, com histórico completo e auditável.',
    },
    {
      icon: 'groups',
      name: 'Atendimento Presencial',
      tagline: 'Organização da equipe interna',
      description:
        'A equipe interna abre e distribui processos entre os fiscais com poucos cliques.',
    },
    {
      icon: 'settings',
      name: 'Configurações do Sistema',
      tagline: 'Personalização sem programar',
      description:
        'Ajuste usuários, permissões e regras do município sem depender de programação.',
    },
  ];
}
