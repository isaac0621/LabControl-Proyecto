export interface Responsable {
  id?: number;
  identificacion: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  correo: string;
  tipoResponsable: string;
  estadoActivo?: boolean;
}