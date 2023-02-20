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

@NgModule({
  declarations: [
    AppComponent,
    LoginPharmacienComponent,
   SignupPharmacienComponent,
   DashboardPharmacienComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
   
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
