import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goToLista(): void {
    this.router.navigate(['/mi-lista']); 
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }
}