import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getMemberProfileData(matricule:string,numPolice:string): Observable<any> {// any : response back office
    const params:{ matricule: string, numPolice: string }={
      matricule:matricule,
      numPolice:numPolice
    }
  
    const options: { params: { [param: string]: string }, responseType: 'text' } = {
      params: {
        matricule: params.matricule,
        numPolice: params.numPolice
      },
      responseType: 'text'
    };
    const body={
      "matricule":matricule,
      "numPolice":numPolice
    }
    
    return this.http.post(
      'http://localhost:8089/Stage/soapWs/profileAdherent/getContratAdherentByMatricule',null,options);
  }
}
