import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { UsuarioSerieService } from '../services/usuario-serie.service';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatButtonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  series: any;
  genres: string = '';
  userId: number | null = null;
  estadoActual: 'VISTA' | 'POR_VER' | 'VIENDO' | null = null;
  guardando: boolean = false;
  mensajeConfirmacion: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService,
    private usuarioSerieService: UsuarioSerieService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = (typeof window !== 'undefined' && localStorage.getItem('userId')) 
      ? Number(localStorage.getItem('userId')) 
      : null;

this.tmdbService.getSerieById(id.toString()).subscribe(data => {
      this.series = data;
      this.genres = data.genres.map((g: any) => g.name).join(', ');

      if (this.userId && this.series?.id) {
        this.usuarioSerieService.obtenerSeries(this.userId).subscribe(series => {
          const match = series.find(s => s.serie.tmdbId === this.series.id);
          if (match) this.estadoActual = match.estado;
        });
      }
    });
  }

  guardarEstado(estado: 'VISTA' | 'POR_VER' | 'VIENDO') {
  if (!this.userId || !this.series?.id) return;

  this.guardando = true;

  this.usuarioSerieService
    .guardarSerie(this.userId, this.series, estado)
    .subscribe({
      next: (res) => {
        console.log(`✅ Serie marcada como ${estado}:`, res);
        this.estadoActual = estado;
        this.guardando = false;
        window.location.reload(); // solo aquí
      },
      error: (error) => {
        console.error(`❌ Error real al guardar serie como ${estado}:`, error);
        if (error?.message && error.message !== 'Error al guardar serie') {
          alert(`Error al guardar como ${estado.toLowerCase()}`);
        }
        this.guardando = false;
      }
    });
    window.location.reload();
}


  eliminarSerie() {
  if (!this.userId || !this.series?.id) return;

  this.guardando = true;

  this.usuarioSerieService.eliminarSerie(this.userId, this.series.id).subscribe({
    next: (res) => {
      console.log('✅ Serie eliminada correctamente:', res);
      this.estadoActual = null;
      this.guardando = false;
      window.location.reload();
    },
    error: (error) => {
      console.error('❌ Error real al eliminar serie:', error);
      if (error?.message && error.message !== 'Error al eliminar serie') {
        alert('Error al eliminar de la lista');
      }
      this.guardando = false;
    }
  });
  window.location.reload();
}

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
