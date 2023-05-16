import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const sesionIniciada = /* Verificar si el usuario tiene una sesión iniciada */;
    const tieneAcceso = /* Verificar si el usuario tiene acceso a la ruta protegida */;

    if (!sesionIniciada || !tieneAcceso) {
      this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
      return false;
    }

    return true;
  }
}
