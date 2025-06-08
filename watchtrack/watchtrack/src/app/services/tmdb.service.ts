import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = 'f67a8ff8943e37365abb84917ca8473d';
  private apiUrl = 'https://api.themoviedb.org/3';
  private language = 'es-ES';

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${encodeURIComponent(query)}`;
    return this.http.get(url);
  }

  searchSeries(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/tv?api_key=${this.apiKey}&language=${this.language}&query=${encodeURIComponent(query)}`;
    return this.http.get(url);
  }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=${this.language}`;
    return this.http.get(url);
  }

  getPopularSeries(): Observable<any> {
    const url = `${this.apiUrl}/tv/popular?api_key=${this.apiKey}&language=${this.language}`;
    return this.http.get(url);
  }

  getMovieDetail(id: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get(url);
  }
  
  getSeriesDetail(id: number): Observable<any> {
    const url = `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get(url);
  }
  
  getSerieById(id: string): Observable<any> {
    const url = `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(url);
  }
  
}
