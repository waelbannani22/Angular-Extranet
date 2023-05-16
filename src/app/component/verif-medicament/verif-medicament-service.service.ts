import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ETAT_MEDICAMENT_REMBOURSABLE, MEDICAMENT_NON_REMBOURSABLE, MEDICAMENT_REMBOURSABLE } from 'src/app.constants';
import { MedicamentElement } from 'src/app/models/medic/medicament-element.model';

@Injectable({
  providedIn: 'root'
})
export class VerifierMedicamentResultService {
  elementDataMedicament: MedicamentElement[] = [];
  constructor(private http: HttpClient) { }

  getListActesPhar(codeActe: string,numPolice:string): Observable<any> { // any back office response
    const params:{ codeActe: string, numPolice: string }={
      codeActe:codeActe,
      numPolice:numPolice
    }
  
    const options: { params: { [param: string]: string }, responseType: 'text' } = {
      params: {
        codeActe: params.codeActe,
        numPolice: params.numPolice
      },
      responseType: 'text'
    };
    return this.http.post(
      'http://localhost:8089/Stage/soapWs/VerifMed/getListActesPhar', null,options);
  }

  createMedicamentData(jsonObj: any): MedicamentElement[] | undefined {
    try {
      this.elementDataMedicament = [];
      if (jsonObj['Envelope']['Body']['getListActesPharResponse']) {
        const medData = jsonObj['Envelope']['Body']['getListActesPharResponse']['return'];
        if (Array.isArray(medData)) {
          for (const key in medData) {
            if (medData.hasOwnProperty(key)) {
              this.elementDataMedicament.push(this.createNewData(
                medData[key]['codeActe'],
                medData[key]['designation'],
                this.etatRembo(medData[key]['remboursable'])
              ));
            }
          }
        } else { // case of only one element
          this.elementDataMedicament.push(this.createNewData(
            medData['codeActe'],
            medData['designation'],
            this.etatRembo(medData['remboursable'])
          ));
        }
        return this.elementDataMedicament;
      } else {
        return undefined; // Return undefined if the condition is not met
      }
    } catch (error) {
      console.log(error);
      return undefined; // Return undefined in case of an error
    }
  }
  
  
  etatRembo(etat: string): string {
    if (etat === ETAT_MEDICAMENT_REMBOURSABLE) {
      return MEDICAMENT_REMBOURSABLE;
    } else {
      return MEDICAMENT_NON_REMBOURSABLE;
    }
  }
  /** Builds and returns a new data. */
  createNewData(reference: string, Benef: string, MontantDep: string): MedicamentElement {
    return {
      reference: reference,
      nomMedicament: Benef,
      etatRemb: MontantDep,
    };
  }
}
