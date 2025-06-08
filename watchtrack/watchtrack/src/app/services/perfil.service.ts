import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  getPerfil(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  actualizarPerfil(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.put(`${this.apiUrl}/${userId}`, datos);
  }
}
