import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  popularSeries: any[] = [];

  searchQuery = '';
  searchResultsMovies: any[] = [];
  searchResultsSeries: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['search'];
      if (query) {
        this.searchQuery = query;
        this.onSearch();
      } else {
        this.loadPopularContent();
      }
    });
  }

  loadPopularContent(): void {
    this.tmdbService.getPopularMovies().subscribe(data => {
      this.popularMovies = data.results;
    });

    this.tmdbService.getPopularSeries().subscribe(data => {
      this.popularSeries = data.results;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.tmdbService.searchMovies(query).subscribe(data => {
      this.searchResultsMovies = data.results;
    });

    this.tmdbService.searchSeries(query).subscribe(data => {
      this.searchResultsSeries = data.results;
    });
  }

  goToMovie(id: number): void {
    this.router.navigate(['/peliculas', id]);
  }

  goToSeries(id: number): void {
    this.router.navigate(['/series', id]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
