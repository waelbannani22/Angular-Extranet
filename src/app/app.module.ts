import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPharmacienComponent } from './component/login-pharmacien/login-pharmacien.component';
import { SignupPharmacienComponent } from './component/signup-pharmacien/signup-pharmacien.component';
import { authInterceptorProviders } from './helper/AuthInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardPharmacienComponent } from './component/dashboard-pharmacien/dashboard-pharmacien.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrdonnanceComponent } from './component/ordonnance/ordonnance.component';
import { MenuComponent } from './component/menu/menu.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { PassComponent } from './component/pass/pass.component';
import { ConjointsComponent } from './component/conjoints/conjoints.component';
import { HistoriqueOrdonnanceComponent } from './component/historique-ordonnance/historique-ordonnance.component';
import { CountryPipe } from './helper/CountryPipe';
import { SortableHeaderDirective } from './helper/sortable-header.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateRangeFilterPipe } from './helper/DateRangeFilterPipe';
import { MatNativeDateModule } from '@angular/material/core';
import { VerifMedicamentComponent } from './component/verif-medicament/verif-medicament.component';
import { ReclamationsComponent } from './component/reclamations/reclamations.component';
//
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
export function tokenGetter() {
  return sessionStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginPharmacienComponent,
   SignupPharmacienComponent,
   DashboardPharmacienComponent,
   ForgetPasswordComponent,
   ChangePasswordComponent,
   FooterComponent,
   OrdonnanceComponent,
   MenuComponent,
   NavBarComponent,
   PassComponent,
   ConjointsComponent,
   HistoriqueOrdonnanceComponent,
   CountryPipe,
  SortableHeaderDirective,
  DateRangeFilterPipe,
  VerifMedicamentComponent,
  ReclamationsComponent
  
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
       
      },
    }),
    NgxPaginationModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    
   
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
