import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BordereauByIdTierParams } from 'src/app/models/bordereau/bordereau-by-id-tier-params.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueActeService {

  constructor(private http: HttpClient) { }

  getFactureBordereauByIdTier(params: BordereauByIdTierParams): Observable<any> {// back office response
    return this.http.post(
      'http://localhost:8089/Stage/Historique/getFactureBordereauByIdTier', params, { responseType: 'text' });
  }

  getFacturePsByIdTier(params: BordereauByIdTierParams): Observable<any> {// back office response
    return this.http.post(
      'http://localhost:8089/Stage/Historique/getFacturePsByIdTier', params, { responseType: 'text' });
  }
  // Backoffice DB:genererBordereaux
  createFacture(idPs: string, montantFacture: number, numFacture: string,
    dateFacture: string, commentaire: string, idfactBord: string, numPolice: string): Observable<any> {
    const params = {
      'idPs': idPs, 'montantFacture': montantFacture, 'numFacture': numFacture,
      'dateFacture': dateFacture, 'idfactBord': idfactBord, 'commentaire': commentaire, 'numPolice': numPolice
    };
    return this.http.post(
      'http://localhost:8089/Stage/Historique/createFacture', params, { responseType: 'text' });
  }

}
