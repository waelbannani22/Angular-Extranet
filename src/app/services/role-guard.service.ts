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
/*
    const expectedRole = route.data['expectedRole'];
    const role = this.tokenStorage.getUser().role
    if(this.loginService.isAuthenticated()&& expectedRole===role){
      return true
    }
    return false
   
  }
  **/

  const expectedRoles: string[] = ['OPTICIEN', 'PHARMACIEN']; // Add the roles here

    const userRoles: string = sessionStorage.getItem("role")! // Replace with your logic to get the user's roles

    const hasMatchingRole =  expectedRoles.includes(userRoles)
    //userRoles.some(role => expectedRoles.includes(role));
    if(route.url[0].path =="VerifPharmacien" ||route.url[0].path =="PowerBiDashboard"){
      if(route.data['expectedRole']== sessionStorage.getItem("role")!){
        return true
     }else{
      this.router.navigate(['/ForbiddenPage']);
      return false
     } 
    }
    if(route.url[0].path =="HistoriqueOrdonnance" ||route.url[0].path =="VerifMed"){
     if(route.data['expectedRole']== sessionStorage.getItem("role")!){
        return true
     }else{
      this.router.navigate(['/ForbiddenPage']);
      return false
     } 
    }
    if (hasMatchingRole) {
      return true;
    } else {
      // Redirect to unauthorized page or handle unauthorized access as per your requirement
      this.router.navigate(['/ForbiddenPage']);
      return false;
    }
}
}
