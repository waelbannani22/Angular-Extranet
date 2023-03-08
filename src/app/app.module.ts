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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
       
      },
    }),
   
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
