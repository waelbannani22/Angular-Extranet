import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPharmacienComponent } from './component/dashboard-pharmacien/dashboard-pharmacien.component';
import { LoginPharmacienComponent } from './component/login-pharmacien/login-pharmacien.component';
import { SignupPharmacienComponent } from './component/signup-pharmacien/signup-pharmacien.component';

const routes: Routes = [

  { path: 'login', component: LoginPharmacienComponent },

  { path: 'sign-up', component: SignupPharmacienComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'DashboardPharmacien', component: DashboardPharmacienComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
