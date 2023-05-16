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
    const user = localStorage.getItem('user');  
    const emisor = localStorage.getItem('emisor');  
    if (user && emisor) { // si ambos valores están presentes, entonces el usuario ha iniciado sesión  
      return true;  
    } else {  
      this.router.navigate(['/']);  
      return false;  
    }  
  }  
  
}  
