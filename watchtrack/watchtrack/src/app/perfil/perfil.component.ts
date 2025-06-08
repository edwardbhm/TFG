import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent
  ]
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  editando = false;

  constructor(private fb: FormBuilder, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.perfilForm.disable();

    this.perfilService.getPerfil().subscribe({
      next: (datos) => {
        this.perfilForm.patchValue({
          nombre: datos.nombre,
          email: datos.email
        });
      },
      error: () => {
        this.perfilForm.patchValue({
          nombre: 'Nombre no disponible',
          email: 'Email no disponible'
        });
      }
    });
  }

  activarEdicion() {
    this.editando = true;
    this.perfilForm.enable();
  }

  guardarCambios(): void {
    if (this.perfilForm.valid) {
      const datos = this.perfilForm.value;
      this.perfilService.actualizarPerfil(datos).subscribe({
        next: () => {
          this.editando = false;
          this.perfilForm.disable();
        },
        error: () => {
          alert('Error al guardar cambios');
        }
      });
    }
  }
}
