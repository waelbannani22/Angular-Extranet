import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CASE_DOSSIER_ARCHIVE, CASE_DOSSIER_REGLE_TOTALEMENT, CHAINE_VIDE, STATUT_DOSSIER_COURS_TRAITEMENT, STATUT_DOSSIER_REGLE, STATUT_DOSSIER_TRAITE_EN_ATTENTE_REGL } from 'src/app.constants';
import { BordereauFacture } from 'src/app/models/bordereau/bordereau-facture.model';
import { UpdateBordereauFacture } from 'src/app/models/bordereau/update-bordereau-facture.model';

@Injectable({
  providedIn: 'root'
})
export class BordereauFactureService {
  ELEMENT_BordereauData: BordereauFacture[] = [];
  bordereau_DATA:UpdateBordereauFacture[]=[]
 
  constructor(private http:HttpClient) { }

  // "Bordereau facturé"
  createElementBordereauFacture(jsonObjfact: any): BordereauFacture[] {// any type required see : xmlTojson service
    this.ELEMENT_BordereauData = [];
    if (jsonObjfact['Envelope']['Body']['getFacturePsByIdTierResponse']) {
      if (jsonObjfact['Envelope']['Body']['getFacturePsByIdTierResponse']['return'] !== CHAINE_VIDE) {
        const bordereauFactureData = jsonObjfact['Envelope']['Body']['getFacturePsByIdTierResponse']['return']['facturePsByIdTiersDtos'];
        if (bordereauFactureData.length > 1) {
          for (const key in bordereauFactureData) {
            if (bordereauFactureData.hasOwnProperty(key)) {
              this.ELEMENT_BordereauData.push({
                ref: bordereauFactureData[key]['reference'],
                date: bordereauFactureData[key]['dateFacture'],
                nbrPrest: bordereauFactureData[key]['nbPrestation'],
                numFact: bordereauFactureData[key]['numFact'],
                mntBordereau: bordereauFactureData[key]['mntFacture'],
                statut: this.getStatus(bordereauFactureData[key]['taskName']),
                OpenUpdate: bordereauFactureData[key],

              });
            }
          }
        } else {
          this.ELEMENT_BordereauData.push({
            ref: bordereauFactureData['reference'],
            date: bordereauFactureData['dateFacture'],
            nbrPrest: bordereauFactureData['nbPrestation'],
            numFact: bordereauFactureData['numFact'],
            mntBordereau: bordereauFactureData['mntFacture'],
            statut: this.getStatus(bordereauFactureData['taskName']),
            OpenUpdate: bordereauFactureData,
          });
        }
      }
    }
    return this.ELEMENT_BordereauData;
  }
  // status
  getStatus(caseStatus: string): string {
    const tab: string[] = ['En attente de saisie', 'En attente validation',
      'Prête pour décompte', 'En attente de correction', 'Suspendue'];
    if (tab.includes(caseStatus)) {
      return STATUT_DOSSIER_COURS_TRAITEMENT;
    }
    if (caseStatus === CASE_DOSSIER_REGLE_TOTALEMENT) {
      return STATUT_DOSSIER_TRAITE_EN_ATTENTE_REGL;
    }
    if (caseStatus === CASE_DOSSIER_ARCHIVE) {
      return STATUT_DOSSIER_REGLE;
    }
    return caseStatus;
  }
  //delete bordereau
  deleteFactureBordereau(idFacture: string, idfactBord: string, commentaire: string, numFacture: string): Observable<any> {
    const params = { 'idFacture': idFacture, 'idfactBord': idfactBord, 'commentaire': commentaire, 'numFacture': numFacture };
    return this.http.post(
      'http://localhost:8089/Stage/Historique/deleteFactureBordereau', params, { responseType: 'text' });
  }
  //partie enveloppe
  addToTable(data: any): UpdateBordereauFacture[] {
    this.bordereau_DATA = [];
    if (data.borderaux) { // ng test requirements
      const bordereauJson =
        data.borderaux['Envelope']['Body']['getFactureBordereauByIdTierResponse']['return']['factureBordereauByIdTiersDtos'];
      if (data.borderaux != null) {
        if (!bordereauJson['empty']) {
          if (data.borderaux['Envelope']['Body']['getFactureBordereauByIdTierResponse']['return']['nbrTotal'] > 1) {
            for (const key in bordereauJson) {
              if (bordereauJson.hasOwnProperty(key)) {
                this.bordereau_DATA.push(
                  {
                    numTransaction: bordereauJson[key]['referenceFactureBordereau'],
                    matriculeAssure: bordereauJson[key]['matriculeAdherent'],
                    nomAssure: bordereauJson[key]['adherent'],
                    nombeneficiaire: bordereauJson[key]['beneficiaire'],
                    qualite_benef: bordereauJson[key]['qualite'],
                    datetransaction: bordereauJson[key]['dateTransaction'],
                    montantTicketModerateur: parseFloat(bordereauJson[key]['mntTicktModerateur']),
                    restePayer: parseFloat(bordereauJson[key]['mntRestePayer']),
                    id: bordereauJson[key]['id']
                  });
              }
            }
          } else {
            this.bordereau_DATA.push(
              {
                numTransaction: bordereauJson['referenceFactureBordereau'],
                matriculeAssure: bordereauJson['matriculeAdherent'],
                nomAssure: bordereauJson['adherent'],
                nombeneficiaire: bordereauJson['beneficiaire'],
                qualite_benef: bordereauJson['qualite'],
                datetransaction: bordereauJson['dateTransaction'],
                montantTicketModerateur: parseFloat(bordereauJson['mntTicktModerateur']),
                restePayer: parseFloat(bordereauJson['mntRestePayer']),
                id: bordereauJson['id']
              });
          }
        }
        return this.bordereau_DATA;
      }
    }
    return []; // Add a default return statement when the conditions are not met
  }
  
}