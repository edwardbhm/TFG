import { TestBed } from '@angular/core/testing';

import { UsuarioSerieService } from './usuario-serie.service';

describe('UsuarioSerieService', () => {
  let service: UsuarioSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
