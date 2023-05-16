import { Injectable } from '@angular/core';  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';  
import { Observable } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
  
  constructor(private router: Router) {}  
  
  canActivate(  
    next: ActivatedRouteSnapshot,  
    state: RouterStateSnapshot): boolean {  
    return this.checkLoggedIn();  
  }  
  
  checkLoggedIn(): boolean {  
    if (localStorage.getItem('token')) { // utilizar la variable loggedIn para comprobar si el usuario ha iniciado sesión  
      return true;  
    } else {  
      this.router.navigate(['/']); // redirigir al usuario a la pantalla de inicio de sesión si no ha iniciado sesión  
      return false;  
    }  
  }  
  
}  
