import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Responsable } from '../models/responsable.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private readonly storageKey = 'responsables_simulados';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const responsablesIniciales: Responsable[] = [
        {
          id: 1,
          identificacion: '10000001',
          nombre: 'Juan',
          primerApellido: 'Pérez',
          segundoApellido: '',
          telefono: '7000-0001',
          correo: 'juan.perez@ejemplo.com',
          tipoResponsable: 'Docente',
          estadoActivo: true
        },
        {
          id: 2,
          identificacion: '10000002',
          nombre: 'María',
          primerApellido: 'López',
          segundoApellido: '',
          telefono: '7000-0002',
          correo: 'maria.lopez@ejemplo.com',
          tipoResponsable: 'Docente',
          estadoActivo: true
        },
        {
          id: 3,
          identificacion: '10000003',
          nombre: 'Carlos',
          primerApellido: 'Gómez',
          segundoApellido: '',
          telefono: '7000-0003',
          correo: 'carlos.gomez@ejemplo.com',
          tipoResponsable: 'Administrativo',
          estadoActivo: true
        }
      ];
      this.guardarDatosLocal(responsablesIniciales);
    }
  }

  private getDatosLocal(): Responsable[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]') as Responsable[];
  }

  private guardarDatosLocal(datos: Responsable[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(datos));
  }

  obtenerResponsables(): Observable<Responsable[]> {
    return of(this.getDatosLocal()).pipe(delay(300));
  }

  obtenerResponsablePorId(id: number): Observable<Responsable> {
    const responsable = this.getDatosLocal().find((item) => item.id === id);
    return of(responsable as Responsable).pipe(delay(300));
  }

  crearResponsable(responsable: Responsable): Observable<Responsable> {
    const lista = this.getDatosLocal();
    const nuevoResponsable: Responsable = {
      ...responsable,
      id: Date.now(),
      estadoActivo: responsable.estadoActivo ?? true
    };
    lista.unshift(nuevoResponsable);
    this.guardarDatosLocal(lista);
    return of(nuevoResponsable).pipe(delay(400));
  }
}