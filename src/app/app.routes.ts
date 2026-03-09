import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login — sem sidebar
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },

  // Páginas com sidebar — dentro do MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./features/clientes/clientes-lista/clientes-lista')
            .then(m => m.ClientesLista)
      },
      {
        path: 'pagamentos',
        loadComponent: () =>
          import('./features/pagamentos/pagamentos-lista/pagamentos-lista')
            .then(m => m.PagamentosLista)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];