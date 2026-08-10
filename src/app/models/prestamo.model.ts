import { Equipo } from './equipo.model';
import { Responsable } from './responsable.model';

export interface Prestamo {
  idPrestamo?: number;
  idEquipo: number;
  idResponsable: number;
  fechaPrestamo?: string;
  fechaEsperadaDevolucion: string;
  fechaRealDevolucion?: string | null;
  observaciones?: string | null;
  observacionesDevolucion?: string | null;
  usuarioRegistra: string;
  usuarioRecibe?: string | null;
  estado?: string;
  
  // Propiedades de navegación opcionales que podría devolver el backend
  equipo?: Equipo;
  responsable?: Responsable;
}

export interface DevolucionDTO {
  fechaRealDevolucion: string;
  observacionesDevolucion?: string | null;
  usuarioRecibe: string;
}
