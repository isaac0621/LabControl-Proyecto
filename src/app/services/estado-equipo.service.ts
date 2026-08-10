import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstadoEquipo } from '../models/estado-equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoEquipoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/EstadosEquipo`;

  constructor() { }

  getEstadosEquipo(): Observable<EstadoEquipo[]> {
    return this.http.get<EstadoEquipo[]>(this.apiUrl);
  }
}
