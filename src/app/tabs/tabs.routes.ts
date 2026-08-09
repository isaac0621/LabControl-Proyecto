import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'equipos',
        loadComponent: () => import('../pages/equipos/equipos.page').then(m => m.EquiposPage),
      },
      {
        path: 'registrar-equipo',
        loadComponent: () => import('../pages/equipo-form/equipo-form.page').then(m => m.EquipoFormPage),
      },
      {
        path: 'prestamos',
        loadComponent: () => import('../pages/prestamos/prestamos.page').then(m => m.PrestamosPage),
      },
      {
        path: '',
        redirectTo: '/tabs/equipos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/equipos',
    pathMatch: 'full',
  },
];