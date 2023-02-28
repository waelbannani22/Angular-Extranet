import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacien } from '../models/pharmacien.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenName } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const AUTH_API = 'http://localhost:8089/Stage/Pharmacien/';
const AUTH_API_PASSWORD = 'http://localhost:8089/Stage/managePassword/forgot-password/';

@Injectable({
  providedIn: 'root',
})
export class LoginPharmacienService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  //login
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'authenticate',
      {
        email,
        password,
        httpOptions,
      },
      { observe: 'response' }
    );
  }
  //signup***********
  signup(pharmacien: Pharmacien): Observable<any> {
    console.log(pharmacien);
    return this.http.post(
      AUTH_API + 'register-pharmacien',
      {
        nom: pharmacien.nom,
        prenom: pharmacien.prenom,
        matricule: pharmacien.matricule,
        password: pharmacien.password,
        email: pharmacien.email,
        role: 'PHARMACIEN',
      },
      { observe: 'response' }
    );
  }
  //forget password email send
  forgetPassword(email: string): Observable<any> {
   
    return this.http.post(
      AUTH_API_PASSWORD+email,{},
      { observe: 'response' }
    );
  }
  //test
  welcome(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Credentials': 'true',
    });
    return this.http.get(AUTH_API + 'welcome');
  }
  updateInfo(pharmacien: Pharmacien): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Credentials': 'true',
    });
    /*  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
                                    .append('Content-Type',  'application/json')
                                    .append('Access-Control-Allow-Methods','PUT')
                                    .append('Access-Control-Allow-Origin', '*') 
                                    .append('Access-Control-Allow-Credentials','true') 
                                    .append('Access-Control-Allow-Origin', 'http://localhost:4200');
   /*
    var headers = {
      headers: new HttpHeaders().set( 'Content-Type',  'application/json')
      .append('Authorization',`Bearer ${token}`)
      .append('Access-Control-Allow-Methods','PUT')
      .append('Access-Control-Allow-Credentials','true')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Origin', 'http://localhost:4200')
      
    };
    **/

    return this.http.put(
      AUTH_API + 'update-pharmacien/',
      {
        id: pharmacien.id,
        nom: pharmacien.nom,
        prenom: pharmacien.prenom,
        matricule: pharmacien.matricule,
        password: pharmacien.password,
        email: pharmacien.email,
        cin: pharmacien.cin,
        ville: pharmacien.ville,
        tel: pharmacien.tel,
        addresse: pharmacien.addresse,
        role: 'PHARMACIEN',
        zip: pharmacien.zip,
        isActivated: pharmacien.isActivated,
      },
      { observe: 'response' }
    );
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  //checking jwt token validity
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    const tokenNew: string = token ?? '';
    // Check whether the token is expired and return
    // true or false
    console.log('is it expired :', this.tokenExpired(tokenNew as string));
    return !this.jwtHelper.isTokenExpired(token);
  }
}
