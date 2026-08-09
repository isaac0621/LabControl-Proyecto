import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Carga la estructura de tabs como ruta principal
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    // Ruta independiente para el detalle del equipo (recibe un ID)
    path: 'equipo-detalle/:id',
    loadComponent: () => import('./pages/equipo-detalle/equipo-detalle.page').then( m => m.EquipoDetallePage)
  },
  {
    path: 'responsables',
    loadComponent: () => import('./pages/responsables/responsables.page').then( m => m.ResponsablesPage)
  },
  {
    path: 'responsable-form',
    loadComponent: () => import('./pages/responsable-form/responsable-form.page').then( m => m.ResponsableFormPage)
  },
  {
    path: 'prestamo-form',
    loadComponent: () => import('./pages/prestamo-form/prestamo-form.page').then( m => m.PrestamoFormPage)
  }
];