// src/app/utils/token.util.ts
export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
