import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/api/perfil';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPerfil(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarPerfil(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.put(`${this.apiUrl}/${userId}`, datos, {
      headers: this.getAuthHeaders()
    });
  }

cambiarContrasena(password: string): Observable<any> {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // 👈 IMPORTANTE
  });

  return this.http.put(`${this.apiUrl}/${userId}/password`, { password }, { headers });
}




}
