// src/app/jwt.config.ts
import { JwtModuleOptions } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter,
    allowedDomains: ['localhost:8080'], // Ajusta si usas otro dominio
    disallowedRoutes: []
  }
};
