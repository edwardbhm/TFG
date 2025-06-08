import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { PerfilService } from '../services/perfil.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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

  nuevaContrasena: string = '';
confirmarContrasena: string = '';
mostrarFormularioContrasena = false;


  constructor(private fb: FormBuilder, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.perfilForm.disable();

    if (typeof window !== 'undefined') {
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

 cambiarContrasena(): void {
  if (!this.nuevaContrasena.trim() || !this.confirmarContrasena.trim()) {
    alert('Por favor completa ambos campos de contraseña');
    return;
  }

  if (this.nuevaContrasena !== this.confirmarContrasena) {
    alert('Las contraseñas no coinciden');
    return;
  }

  this.perfilService.cambiarContrasena(this.nuevaContrasena).subscribe({
    next: () => {
      alert('✅ Contraseña actualizada correctamente');
      this.nuevaContrasena = '';
      this.confirmarContrasena = '';
      this.mostrarFormularioContrasena = false;
    },
    error: (error) => {
      console.error('Error real:', error);
      alert('❌ Error al actualizar la contraseña');
    }
  });
}


}
