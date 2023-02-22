import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPharmacienService } from './login-pharmacien.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  

  constructor(public auth: LoginPharmacienService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log("not connected")
      this.router.navigate(['/login']);
      return false;
    }
    console.log("not connected")
    return true;
  }
}
