import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8089/Stage/Admin/';
@Injectable({
  providedIn: 'root'
})
export class User {
  id!: number;
  nom!: string;
  prenom!: string;
  email!: string;
  addresse!: string;
  ville!: string;
  tel!: string;
  isActivated!: boolean;
  matricule!: string;
  role!: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) {

   }
   retrieveAllUserNonVerified(): Observable<any> {
   
    return this.http.get(
      AUTH_API + 'getAllPharmacienNonVerified',
      
      { observe: 'response' }
    );
  }
  acceptUser(id:number): Observable<any> {
   
    return this.http.post(
      AUTH_API + 'AcceptPharamacien/'+id,
      
      { observe: 'response' }
    );
  }

}
