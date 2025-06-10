import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderPublicoComponent } from '../shared/header-publico/header-publico.component';


@Component({
  selector: 'app-inicio-publico',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, HeaderPublicoComponent],
  templateUrl: './inicio-publico.component.html',
  styleUrls: ['./inicio-publico.component.css']
})
export class InicioPublicoComponent implements OnInit {
  popularesPeliculas: any[] = [];
  popularesSeries: any[] = [];

  constructor(private tmdb: TmdbService, private router: Router) {}

  ngOnInit(): void {
    this.tmdb.getPopularMovies().subscribe(data => this.popularesPeliculas = data.results.slice(0,18));
    this.tmdb.getPopularSeries().subscribe(data => this.popularesSeries = data.results.slice(0,18));
  }

  irALogin() {
    this.router.navigate(['/auth/login']);
  }

  irARegistro() {
    this.router.navigate(['/auth/register']);
  }
}
