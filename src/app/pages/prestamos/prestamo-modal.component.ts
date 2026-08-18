import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../../models/responsable.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private http = inject(HttpClient);
  
  private readonly apiUrl = 'http://apiweb-sac.somee.com/api/Responsable';

  constructor() { }

  obtenerResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.apiUrl);
  }

  obtenerResponsablePorId(id: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.apiUrl}/${id}`);
  }

  crearResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.post<Responsable>(this.apiUrl, responsable);
  }
}