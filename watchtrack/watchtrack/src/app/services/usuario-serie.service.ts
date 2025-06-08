import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSerieService {
  private baseUrl = 'http://localhost:8080/usuario-series';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  guardarSerie(
    usuarioId: number,
    serie: any,
    estado: 'VIENDO' | 'VISTA' | 'POR_VER'
  ): Observable<any> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('serieId', serie.id)
      .set('estado', estado)
      .set('titulo', serie.name)
      .set('sinopsis', serie.overview || '')
      .set('temporadas', serie.number_of_seasons?.toString() || '0')
      .set('imagen', serie.poster_path || '');

    return this.http.post(`${this.baseUrl}/guardar`, {}, {
      params,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al guardar serie:', err);
        return throwError(() => new Error('Error al guardar serie'));
      })
    );
  }

  obtenerSeries(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${usuarioId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al obtener series:', err);
        return throwError(() => new Error('Error al obtener series'));
      })
    );
  }

  eliminarSerie(usuarioId: number, serieId: number): Observable<any> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('serieId', serieId);

    return this.http.delete(`${this.baseUrl}/eliminar`, {
      params,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al eliminar serie:', err);
        return throwError(() => new Error('Error al eliminar serie'));
      })
    );
  }
}
