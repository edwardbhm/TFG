import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatButtonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  series: any;
  genres: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdbService.getSerieById(id).subscribe(data => {
        this.series = data;
        this.genres = data.genres.map((g: any) => g.name).join(', ');
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
