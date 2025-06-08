import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPeliculaService } from '../services/usuario-pelicula.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-lista',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatCardModule, MatButtonModule],
  templateUrl: './mi-lista.component.html',
  styleUrls: ['./mi-lista.component.css']
})
export class MiListaComponent implements OnInit {
  userId: number | null = null;
  vistas: any[] = [];
  pendientes: any[] = [];

  constructor(
    private usuarioPeliculaService: UsuarioPeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = (typeof window !== 'undefined' && localStorage.getItem('userId')) 
      ? Number(localStorage.getItem('userId')) 
      : null;

    if (this.userId) {
      this.usuarioPeliculaService.obtenerPeliculas(this.userId).subscribe(peliculas => {
        this.vistas = peliculas.filter(p => p.estado === 'VISTA');
        this.pendientes = peliculas.filter(p => p.estado === 'POR_VER');
      });
    }
  }

  verDetalle(tmdbId: number): void {
    this.router.navigate(['/peliculas', tmdbId]);
  }
}
