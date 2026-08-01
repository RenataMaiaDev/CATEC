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

  // Redirecionamento de rotas inexistentes para a principal
  {
    path: '**',
    redirectTo: '',
  },
];
