import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPeliculaService {
  private baseUrl = 'http://localhost:8080/usuario-peliculas';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  guardarPelicula(
    usuarioId: number,
    pelicula: any,  // el objeto TMDB completo
    estado: 'VISTA' | 'POR_VER'
  ): Observable<any> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('peliculaId', pelicula.id)
      .set('estado', estado)
      .set('titulo', pelicula.title)
      .set('sinopsis', pelicula.overview || '')
      .set('duracion', pelicula.runtime?.toString() || '0')
      .set('imagen', pelicula.poster_path || '');

    return this.http.post(`${this.baseUrl}/guardar`, {}, {
      params,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al guardar película:', err);
        return throwError(() => new Error('Error al guardar película'));
      })
    );
  }

  obtenerPeliculas(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${usuarioId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al obtener películas:', err);
        return throwError(() => new Error('Error al obtener películas'));
      })
    );
  }

  eliminarPelicula(usuarioId: number, peliculaId: number): Observable<any> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId)
      .set('peliculaId', peliculaId);

    return this.http.delete(`${this.baseUrl}/eliminar`, {
      params,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        console.error('Error al eliminar película:', err);
        return throwError(() => new Error('Error al eliminar película'));
      })
    );
  }
}
