import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private readonly storageKey = 'equipos_simulados';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const equiposIniciales: Equipo[] = [
        {
          idEquipo: 1,
          codigo: 'EQ-001',
          nombreEquipo: 'Computadora de escritorio',
          descripcion: 'Equipo de escritorio para labores administrativas',
          marca: 'Dell',
          modelo: 'OptiPlex 7090',
          serie: 'DELL-001',
          numeroActivo: 'ACT-001',
          fechaCompra: '2024-01-15',
          valorEstimado: 850,
          fotoUrl: null,
          observaciones: null,
          activo: true,
          idCategoria: 1,
          categoria: 'Computadora',
          idUbicacion: 1,
          ubicacion: 'Laboratorio 1',
          idEstadoEquipo: 1,
          estadoEquipo: 'Disponible',
          creadoEnApp: false
        },
        {
          idEquipo: 2,
          codigo: 'EQ-002',
          nombreEquipo: 'Laptop Dell',
          descripcion: 'Computadora portátil para uso académico',
          marca: 'Dell',
          modelo: 'Latitude 5420',
          serie: 'DELL-002',
          numeroActivo: 'ACT-002',
          fechaCompra: '2024-02-20',
          valorEstimado: 1100,
          fotoUrl: null,
          observaciones: null,
          activo: true,
          idCategoria: 1,
          categoria: 'Computadora',
          idUbicacion: 1,
          ubicacion: 'Laboratorio 1',
          idEstadoEquipo: 1,
          estadoEquipo: 'Disponible',
          creadoEnApp: false
        },
        {
          idEquipo: 3,
          codigo: 'EQ-003',
          nombreEquipo: 'Monitor HP',
          descripcion: 'Monitor externo de alta definición',
          marca: 'HP',
          modelo: 'E24 G4',
          serie: 'HP-003',
          numeroActivo: 'ACT-003',
          fechaCompra: '2023-11-10',
          valorEstimado: 280,
          fotoUrl: null,
          observaciones: null,
          activo: true,
          idCategoria: 2,
          categoria: 'Monitor',
          idUbicacion: 2,
          ubicacion: 'Laboratorio 2',
          idEstadoEquipo: 1,
          estadoEquipo: 'Disponible',
          creadoEnApp: false
        },
        {
          idEquipo: 4,
          codigo: 'EQ-004',
          nombreEquipo: 'Proyector Epson',
          descripcion: 'Proyector para presentaciones y clases',
          marca: 'Epson',
          modelo: 'PowerLite X49',
          serie: 'EPS-004',
          numeroActivo: 'ACT-004',
          fechaCompra: '2023-08-05',
          valorEstimado: 650,
          fotoUrl: null,
          observaciones: null,
          activo: true,
          idCategoria: 3,
          categoria: 'Proyector',
          idUbicacion: 2,
          ubicacion: 'Laboratorio 2',
          idEstadoEquipo: 1,
          estadoEquipo: 'Disponible',
          creadoEnApp: false
        }
      ];
      this.guardarDatosLocal(equiposIniciales);
    }
  }

  private getDatosLocal(): Equipo[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]') as Equipo[];
  }

  private guardarDatosLocal(datos: Equipo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(datos));
  }

  getEquipos(): Observable<Equipo[]> {
    return of(this.getDatosLocal()).pipe(delay(300));
  }

  getEquipo(id: number): Observable<Equipo> {
    const equipo = this.getDatosLocal().find((item) => item.idEquipo === id);
    return of(equipo as Equipo).pipe(delay(300));
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    const lista = this.getDatosLocal();
    const nuevoEquipo: Equipo = {
      ...equipo,
      idEquipo: Date.now(),
      creadoEnApp: true
    };
    lista.unshift(nuevoEquipo);
    this.guardarDatosLocal(lista);
    return of(nuevoEquipo).pipe(delay(400));
  }

  updateEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    const lista = this.getDatosLocal();
    const indice = lista.findIndex((item) => item.idEquipo === id);
    const equipoActualizado: Equipo = { ...equipo, idEquipo: id, creadoEnApp: true };

    if (indice >= 0) {
      lista[indice] = equipoActualizado;
      this.guardarDatosLocal(lista);
    }

    return of(equipoActualizado).pipe(delay(400));
  }

  deleteEquipo(id: number): Observable<any> {
    const lista = this.getDatosLocal().filter((item) => item.idEquipo !== id);
    this.guardarDatosLocal(lista);
    return of({ success: true }).pipe(delay(300));
  }
}
