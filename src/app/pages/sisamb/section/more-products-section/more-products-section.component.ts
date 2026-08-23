import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface Modulo {
  icon: string;
  name: string;
  tagline: string;
  description: string;
}

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "A solução": the modules that make up the SISAMB platform.
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
    {
      icon: 'auto_awesome',
      name: 'Assistente Virtual Dedicado',
      tagline: 'Tira-dúvidas sobre legislação ambiental',
      description:
        'Saiba tudo sobre a legislação ambiental do seu município e muito mais.',
    },
    {
      icon: 'folder_special',
      name: 'Curadoria de Documentos',
      tagline: 'Verificação e validação por IA',
      description:
        'Seus documentos são verificados, validados e guardados em nuvem, tudo gerenciado por uma IA dedicada e exclusiva.',
    },
    {
      icon: 'post_add',
      name: 'Criação de Novos Processos',
      tagline: 'Abertura de processos 100% online',
      description:
        'Crie novos processos on-line e gerencie suas demandas.',
    },
    {
      icon: 'local_shipping',
      name: 'Cadastro de Frotas',
      tagline: 'Veículos e containers sob controle',
      description:
        'Cadastre seus veículos ou containers e faça o gerenciamento on-line.',
    },
    {
      icon: 'badge',
      name: 'Cadastro de Profissionais e Técnicos',
      tagline: 'Ofereça seus serviços em poucos passos',
      description:
        'De forma simples, ofereça seus serviços para o setor público e privado.',
    },
    {
      icon: 'gavel',
      name: 'Legislação Atualizada',
      tagline: 'Mudanças do setor em um só lugar',
      description:
        'Acompanhe as mudanças do setor de forma mais fácil, tudo num só lugar.',
    },
    {
      icon: 'receipt_long',
      name: 'Registro de Dados',
      tagline: 'Sua informação na palma da mão',
      description:
        'Quantidade de material, tipo de material, local para reprocessamento de resíduo — tudo isso e muito mais.',
    },
    {
      icon: 'account_balance',
      name: 'Gerência dos Conselhos Ambientais',
      tagline: 'Atas, despachos e histórico organizados',
      description:
        'Ata, despachos, assinaturas e histórico — tudo mais fácil, transparente e confiável, gerenciado na palma da mão.',
    },
    {
      icon: 'location_on',
      name: 'Despachos Fiscais In Loco',
      tagline: 'Fiscalização mais ágil em campo',
      description:
        'O trabalho dos fiscais fica mais fácil, rápido e tempestivo — uma experiência nova e mais inteligente para o seu município.',
    },
  ];

  // Opens the tônomei platform login in a new tab.
  abrirLoginTonomei(): void {
    window.open('https://tonomei.com.br/app/login-demo', '_blank', 'noopener,noreferrer');
  }
}
