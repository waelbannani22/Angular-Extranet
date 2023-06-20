import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ConjointsComponent } from './component/conjoints/conjoints.component';
import { DashboardPharmacienComponent } from './component/dashboard-pharmacien/dashboard-pharmacien.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { HistoriqueOrdonnanceComponent } from './component/historique-ordonnance/historique-ordonnance.component';
import { LoginPharmacienComponent } from './component/login-pharmacien/login-pharmacien.component';
import { MenuComponent } from './component/menu/menu.component';
import { OrdonnanceComponent } from './component/ordonnance/ordonnance.component';
import { PassComponent } from './component/pass/pass.component';
import { ReclamationsComponent } from './component/reclamations/reclamations.component';
import { SignupPharmacienComponent } from './component/signup-pharmacien/signup-pharmacien.component';
import { VerifMedicamentComponent } from './component/verif-medicament/verif-medicament.component';
import { VerifPharmacienComponent } from './component/verif-pharmacien/verif-pharmacien.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { PowerBiDashboardComponent } from './component/PowerBiDashboard/power-bi-dashboard/power-bi-dashboard.component';
import { ActeOptiqueComponent } from './component/acte-optique/acte-optique.component';
import { ForbiddenPageComponent } from './component/forbidden-page/forbidden-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPharmacienComponent },

  { path: 'sign-up', component: SignupPharmacienComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'DashboardPharmacien',
    component: DashboardPharmacienComponent,
    
    canActivate: [RoleGuardService],
    data: {
      expectedRole:  ['OPTICIEN', 'PHARMACIEN']
      
    },
    
  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'ordonnance', component: OrdonnanceComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'Pass', component: PassComponent },
  { path: 'Conjoints', component: ConjointsComponent },
  { path: 'HistoriqueOrdonnance',
   component: HistoriqueOrdonnanceComponent,
   canActivate: [RoleGuardService],
    data: {
      expectedRole:   'PHARMACIEN'
      
    },
   },
  { path: 'VerifMed', component: VerifMedicamentComponent ,
  canActivate: [RoleGuardService],
  data: {
    expectedRole:   'PHARMACIEN'
    
  },},
  { path: 'Reclamations', component: ReclamationsComponent },
  { path: 'VerifPharmacien', component: VerifPharmacienComponent,
  canActivate: [RoleGuardService],
  data: {
    expectedRole:   'ADMIN'
    
  }, },
  { path: 'PowerBiDashboard', component: PowerBiDashboardComponent,
  canActivate: [RoleGuardService],
  data: {
    expectedRole:   'ADMIN'
    
  }, },
  { path: 'ActeOptique', component: ActeOptiqueComponent },
  { path: 'ForbiddenPage', component: ForbiddenPageComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
/* canActivate:[RoleGuardService],
data:{
  expectedRole:'PHARMACIEN'
},
**/
