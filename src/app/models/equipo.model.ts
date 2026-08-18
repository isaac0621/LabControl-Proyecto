export interface Equipo {
  idEquipo?: number;
  codigo: string;
  nombreEquipo: string;
  descripcion?: string | null;
  marca?: string | null;
  modelo: string;
  serie: string;
  numeroActivo?: string | null;
  fechaRegistro?: string | null;
  fechaCompra?: string | null;
  valorEstimado?: number | null;
  fotoUrl?: string | null;
  observaciones?: string | null;
  activo: boolean;
  idCategoria: number;
  categoria?: string;
  idUbicacion: number;
  ubicacion?: string;
  idEstadoEquipo: number;
  estadoEquipo?: string;
  creadoEnApp?: boolean;
}
