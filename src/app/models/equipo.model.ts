export interface Equipo {
  id?: number;
  nombre: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  categoriaId: number;
  ubicacionId: number;
  estadoEquipoId: number;
}