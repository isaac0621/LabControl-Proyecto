import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  // Asegúrate de cambiar esto por la IP o dominio de tu API ASP.NET Core
  private apiUrl = 'http://apiweb-sac.somee.com/api/equipos'; 

  constructor(private http: HttpClient) { }

  // GET: Obtiene la lista para el Tab 1
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  // GET: Obtiene el detalle de un equipo específico
  getEquipoById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${id}`);
  }

  // POST: Guarda un equipo desde el Tab 2
  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, equipo);
  }

  // PUT: Edita un equipo existente
  updateEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}/${id}`, equipo);
  }

  // DELETE: Elimina un equipo
  deleteEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}