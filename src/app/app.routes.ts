import { Routes } from '@angular/router';

export const routes: Routes = [
  // Main / root route (Catec LP)
  {
    path: '',
    loadComponent: () =>
      import('./pages/catec/home/home.page').then((m) => m.HomePage),
  },

  // SISAMB route
  {
    path: 'sisamb',
    loadComponent: () =>
      import('./pages/sisamb/home/home.page').then((m) => m.HomePage),
  },

  // Gestão Una route
  {
    path: 'gestao-una',
    loadComponent: () =>
      import('./pages/gestao-una/home/home.page').then((m) => m.HomePage),
  },

  // tônomei route
  {
    path: 'tonomei',
    loadComponent: () =>
      import('./pages/tonomei/home/home.page').then((m) => m.HomePage),
  },

  // Privacy Policy route
  {
    path: 'politica-de-privacidade',
    loadComponent: () =>
      import('./pages/legal/privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage,
      ),
  },

  // Terms of Use route
  {
    path: 'termos-de-uso',
    loadComponent: () =>
      import('./pages/legal/terms-of-use/terms-of-use.page').then(
        (m) => m.TermsOfUsePage,
      ),
  },

  // Redirect unknown routes to the main page
  {
    path: '**',
    redirectTo: '',
  },
];
