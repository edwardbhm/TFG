import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';  // ✅ Versión moderna con import con nombre

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
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

            this.message = 'Login correcto ✅';
            this.router.navigate(['/home']);
          } catch (e) {
            console.error('Error al decodificar el token:', e);
            this.message = 'Error procesando el token ❌';
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.message = 'Error en login ❌';
        }
      });
    }
  }
}
