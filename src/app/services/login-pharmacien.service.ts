import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacien } from '../models/pharmacien.model';

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
   
  
  
  constructor(private http:HttpClient) {  }
   
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


}
