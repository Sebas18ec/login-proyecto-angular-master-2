import { Injectable } from '@angular/core';  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';  
import { EmisorService } from './shared/emisor.service';
  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
  
    constructor(private router: Router, private emisorService: EmisorService) {}  

  
  canActivate(  
    next: ActivatedRouteSnapshot,  
    state: RouterStateSnapshot): boolean {  
      if (this.isAuthenticated()) {  
        return true;  
      } else {  
        this.router.navigate(['/']);  
        return false;  
      }  
  }  
  
  private isAuthenticated(): boolean {  
    const emisorData = this.emisorService.getEmisorData();  
    return !!emisorData;  
  }  
  
  
}  
