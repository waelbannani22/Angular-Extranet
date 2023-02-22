import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPharmacienService } from './login-pharmacien.service';
import { TokenStorageService } from './token-storage-service.service';
@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate{

  constructor(public router: Router,private loginService:LoginPharmacienService,private tokenStorage:TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean  {

    const expectedRole = route.data['expectedRole'];
    const role = this.tokenStorage.getUser().role
    if(this.loginService.isAuthenticated()&& expectedRole===role){
      return true
    }
    return false
   
  }
}
