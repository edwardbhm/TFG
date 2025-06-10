import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPublicoComponent } from './inicio-publico.component';

describe('InicioPublicoComponent', () => {
  let component: InicioPublicoComponent;
  let fixture: ComponentFixture<InicioPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
