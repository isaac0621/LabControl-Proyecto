import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../../models/responsable.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private readonly apiUrl = 'http://labcontrolwebsac.somee.com/Responsables';

  constructor(private http: HttpClient) { }

  // Obtener lista completa de responsables (GET)
  obtenerResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.apiUrl);
  }

  // Obtener un responsable específico por su ID (GET)
  obtenerResponsablePorId(id: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.apiUrl}/${id}`);
  }

  // Registrar un nuevo responsable (POST)
  crearResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.post<Responsable>(this.apiUrl, responsable);
  }
}