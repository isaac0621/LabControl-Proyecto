import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../models/responsable.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private readonly apiUrl = 'http://apiweb-sac.somee.com/swagger/Responsables';

  constructor(private http: HttpClient) { }

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