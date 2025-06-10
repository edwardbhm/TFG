import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { UsuarioPeliculaService } from '../services/usuario-pelicula.service';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatButtonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movie: any;
  genres: string = '';
  userId: number | null = null;
  estadoActual: 'VISTA' | 'POR_VER' | null = null;
  guardando: boolean = false;
  mensajeConfirmacion: string = '';

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private usuarioPeliculaService: UsuarioPeliculaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = (typeof window !== 'undefined' && localStorage.getItem('userId'))
      ? Number(localStorage.getItem('userId'))
      : null;

    this.tmdbService.getMovieDetail(id).subscribe(data => {
      this.movie = data;
      this.genres = data.genres.map((g: any) => g.name).join(', ');

      if (this.userId && this.movie?.id) {
        this.usuarioPeliculaService.obtenerPeliculas(this.userId).subscribe(pelis => {
          const match = pelis.find(p => p.pelicula.tmdbId === this.movie.id);
          if (match) this.estadoActual = match.estado;
        });
      }
    });
  }

  guardarEstado(estado: 'VISTA' | 'POR_VER') {
    if (!this.userId || !this.movie?.id) return;

    this.guardando = true;

    this.usuarioPeliculaService
      .guardarPelicula(this.userId, this.movie, estado)
      .subscribe({
        next: (res) => {
          console.log(`✅ Película marcada como ${estado}:`, res);
          this.estadoActual = estado;
          this.guardando = false;
          window.location.reload();
        },
        error: (error) => {
          console.error(`❌ Error real al guardar película como ${estado}:`, error);
          if (error?.message && error.message !== 'Error al guardar película') {
            alert(`Error al guardar como ${estado === 'VISTA' ? 'vista' : 'pendiente'}`);
          }
          this.guardando = false;
        }
      });
                window.location.reload();

  }

  eliminarDeLista() {
    if (!this.userId || !this.movie?.id) return;

    this.guardando = true;

    this.usuarioPeliculaService.eliminarPelicula(this.userId, this.movie.id).subscribe({
      next: (res) => {
        console.log('✅ Película eliminada correctamente:', res);
        this.estadoActual = null;
        this.guardando = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('❌ Error real al eliminar película:', error);
        if (error?.message && error.message !== 'Error al eliminar película') {
          alert('Error al eliminar de la lista');
        }
        this.guardando = false;
      }
    });          window.location.reload();

  }

  goBack(): void {
    this.location.back(); // ← vuelve a la página anterior exacta
  }
}
