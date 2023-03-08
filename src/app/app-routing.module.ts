import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { DashboardPharmacienComponent } from './component/dashboard-pharmacien/dashboard-pharmacien.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LoginPharmacienComponent } from './component/login-pharmacien/login-pharmacien.component';
import { MenuComponent } from './component/menu/menu.component';
import { OrdonnanceComponent } from './component/ordonnance/ordonnance.component';
import { SignupPharmacienComponent } from './component/signup-pharmacien/signup-pharmacien.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [

  { path: 'login', component: LoginPharmacienComponent },

  { path: 'sign-up', component: SignupPharmacienComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'DashboardPharmacien', 
      component: DashboardPharmacienComponent,
      canActivate:[RoleGuardService],
      data:{
        expectedRole:'PHARMACIEN'
      }

  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'ordonnance', component: OrdonnanceComponent },
  { path: 'menu', component: MenuComponent },
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
