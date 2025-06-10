import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { HeaderPublicoComponent } from '../../shared/header-publico/header-publico.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderPublicoComponent
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.message = 'Por favor, completa correctamente el formulario.';
      return;
    }

    const { nombre, email, password } = this.registerForm.value;

    this.authService.register({ nombre, email, password }).subscribe({
      next: () => {
        // 🔁 Hacer login automático
        this.authService.login({ email, password }).subscribe({
          next: (res) => {
            const token = res.token;
            localStorage.setItem('token', token);

            try {
              const decoded: any = jwtDecode(token);
              if (decoded?.userId) {
                localStorage.setItem('userId', decoded.userId);
              }
              if (decoded?.email) {
                localStorage.setItem('email', decoded.email);
              }
              if (decoded?.nombre) {
                localStorage.setItem('nombre', decoded.nombre);
              }

              this.message = 'Registro y login correctos ✅';
              this.router.navigate(['/home']);
            } catch (e) {
              console.error('Error al decodificar el token:', e);
              this.message = 'Error al procesar el token después del registro';
            }
          },
          error: () => {
            this.message = 'Registro completado, pero error al iniciar sesión automáticamente';
          }
        });
      },
      error: (err) => {
        console.error('Error en registro:', err);
        this.message = 'Error en registro ❌';
      }
    });
  }
   irALogin() {
    this.router.navigate(['/auth/login']);
  }

  irARegistro() {
    this.router.navigate(['/auth/register']);
  }
}
