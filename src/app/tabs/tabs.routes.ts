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
        loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page),
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