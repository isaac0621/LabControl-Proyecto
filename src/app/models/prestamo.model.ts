export interface Prestamo {
  id?: number;
  equipoId: number;
  responsableId: number;
  fechaPrestamo: string; 
  fechaDevolucionEsperada?: string;
  fechaDevolucionReal?: string;
  estado: string; // Ej: 'Activo', 'Devuelto'
}