import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Prestamo, DevolucionDTO } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private storageKey = 'prestamos_simulados';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private getDatosLocal(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private guardarDatosLocal(datos: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(datos));
  }

  getPrestamos(): Observable<any[]> {
    return of(this.getDatosLocal()).pipe(delay(300));
  }

  getPrestamoById(id: number): Observable<any> {
    const item = this.getDatosLocal().find((prestamo: any) => prestamo.id === id);
    return of(item).pipe(delay(300));
  }

  createPrestamo(prestamo: any): Observable<any> {
    const lista = this.getDatosLocal();
    const nuevoPrestamo = {
      ...prestamo,
      id: Date.now(),
      fecha: new Date().toLocaleDateString()
    };
    lista.unshift(nuevoPrestamo);
    this.guardarDatosLocal(lista);
    return of(nuevoPrestamo).pipe(delay(400));
  }

  devolverPrestamo(id: number, devolucion: DevolucionDTO): Observable<any> {
    let lista = this.getDatosLocal();
    lista = lista.filter((prestamo: any) => prestamo.id !== id);
    this.guardarDatosLocal(lista);
    return of({ success: true }).pipe(delay(300));
  }
}
