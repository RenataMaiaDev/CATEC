import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rota Principal / Raiz (Catec LP)
  {
    path: '',
    loadComponent: () =>
      import('./pages/catec/home/home.page').then((m) => m.HomePage),
  },

  // Rota SISAMB
  {
    path: 'sisamb',
    loadComponent: () =>
      import('./pages/sisamb/home/home.page').then((m) => m.HomePage), // Ajuste a classe da HomePage do SISAMB
  },

  // Rota Gestão Una
  {
    path: 'gestao-una',
    loadComponent: () =>
      import('./pages/gestao-una/home/home.page').then((m) => m.HomePage), // Ajuste a classe da HomePage do Gestão Una
  },

  // Rota tônomei
  {
    path: 'tonomei',
    loadComponent: () =>
      import('./pages/tonomei/home/home.page').then((m) => m.HomePage), // Ajuste a classe da HomePage do tônomei
  },

  // Rota Política de Privacidade
  {
    path: 'politica-de-privacidade',
    loadComponent: () =>
      import('./pages/legal/privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage,
      ),
  },

  // Rota Termos de Uso
  {
    path: 'termos-de-uso',
    loadComponent: () =>
      import('./pages/legal/terms-of-use/terms-of-use.page').then(
        (m) => m.TermsOfUsePage,
      ),
  },

  // Redirecionamento de rotas inexistentes para a principal
  {
    path: '**',
    redirectTo: '',
  },
];
