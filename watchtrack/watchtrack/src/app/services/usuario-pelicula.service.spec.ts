import { TestBed } from '@angular/core/testing';

import { UsuarioPeliculaService } from './usuario-pelicula.service';

describe('UsuarioPeliculaService', () => {
  let service: UsuarioPeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioPeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
