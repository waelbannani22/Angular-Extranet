import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacien } from '../models/pharmacien.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenName } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   
  })
};

const AUTH_API ="http://localhost:8089/Stage/Pharmacien/"

@Injectable({
  providedIn: 'root'
})
export class LoginPharmacienService {
   
  
  
  constructor(private http:HttpClient,public jwtHelper: JwtHelperService) {  }
   
  //login
   login(email:string,password:string):Observable<any>{

      return this.http.post(AUTH_API +"authenticate",{
          email,password,httpOptions
      },{observe: 'response'})

   }
   //signup***********
   signup(pharmacien:Pharmacien):Observable<any>{
    console.log(pharmacien)
    return this.http.post(AUTH_API +"register-pharmacien",{
      
        "nom":pharmacien.nom,
        "prenom":pharmacien.prenom,
        "matricule":pharmacien.matricule,
        "password":pharmacien.password,
        "email":pharmacien.email,
        "role":"PHARMACIEN"
    
    },{observe: 'response'})
   }

   private tokenExpired(token: string):boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
   //checking jwt token validity
   public isAuthenticated(): boolean {

    const token = sessionStorage.getItem('token');
    const tokenNew: string = token ?? '';
    // Check whether the token is expired and return
    // true or false
    console.log("is it expired :",this.tokenExpired(tokenNew as string))
    return !this.jwtHelper.isTokenExpired(token);

  }


}
