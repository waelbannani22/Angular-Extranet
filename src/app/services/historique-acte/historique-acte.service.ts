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
      '/getFacturePsByIdTier', params, { responseType: 'text' });
  }

}
