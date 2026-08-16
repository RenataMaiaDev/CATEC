import { Component } from '@angular/core';
import { TonomeiButtonComponent } from '../../components/tonomei-button/tonomei-button.component';

interface AdvantageItem {
  icon: string;
  title: string;
  description: string;
}

const ADVANTAGES: AdvantageItem[] = [
  {
    icon: 'receipt_long',
    title: 'Emissão e Controle DAS',
    description:
      'Gerenciamos suas guias automaticamente. Sem risco, sem multas, sem atrasos.',
  },
  {
    icon: 'receipt',
    title: 'Emissor de NFe',
    description:
      'Emita suas notas fiscais eletrônicas direto pela plataforma, de forma rápida e sem complicação.',
  },
  {
    icon: 'description',
    title: 'Declaração anual simplificada',
    description:
      'Cumpra a DASN-SIMEI direto pela plataforma, sem depender de terceiros.',
  },
  {
    icon: 'inventory_2',
    title: 'Controle de Estoque',
    description:
      'Cadastre seus produtos e serviços e mantenha controle total de seus estoques e prazos de validade.',
  },
  {
    icon: 'storefront',
    title: 'Vitrine Integrada',
    description:
      'Aqui você será visto, novos clientes, novos mercados, mais negócios para dentro de sua empresa.',
  },
  {
    icon: 'payments',
    title: 'Gestão de Gastos',
    description:
      'Registre, acompanhe e descubra como o gerenciamento dos seus gastos agora ficou mais fácil e inteligente.',
  },
  {
    icon: 'school',
    title: 'Trilha do conhecimento',
    description:
      'Aqui, de qualquer lugar, você pode fazer seu curso, seu treinamento e melhorar ainda mais seu negócio.',
  },
  {
    icon: 'verified',
    title: 'Validação de documentos',
    description:
      'A ferramenta tônomei analisa e valida seus documentos, ou seja, sua validade, sua origem e demais itens de segurança.',
  },
  {
    icon: 'event',
    title: 'Feiras e Eventos',
    description:
      'Permite que você tenha acesso as feiras e eventos para vender seus produtos e serviços através de uma reserva simples e descomplicada.',
  },
];

@Component({
  selector: 'app-more-products-section',
  standalone: true,
  imports: [TonomeiButtonComponent],
  templateUrl: './more-products-section.component.html',
  styleUrl: './more-products-section.component.scss',
})
// "Conheça as Vantagens" section: hover-reveal grid of the 9 feature cards.
export class MoreProductsSectionComponent {
  readonly advantages = ADVANTAGES;

  // Opens the given URL in a new tab.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
}
