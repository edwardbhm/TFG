import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'series',
    loadComponent: () => import('./series/series.component').then(m => m.SeriesComponent)
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./peliculas/peliculas.component').then(m => m.PeliculasComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'mi-lista',
    loadComponent: () => import('./mi-lista/mi-lista.component').then(m => m.MiListaComponent)
  },
  {
    path: 'peliculas/:id',
    loadComponent: () => import('./peliculas/detail.component').then(m => m.DetailComponent)
  },
  {
    path: 'series/:id',
    loadComponent: () => import('./series/detail.component').then(m => m.DetailComponent)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
