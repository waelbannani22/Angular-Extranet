import { Injectable } from '@angular/core';
import { CASE_DOSSIER_ARCHIVE, CASE_DOSSIER_REGLE_TOTALEMENT, CHAINE_VIDE, STATUT_DOSSIER_COURS_TRAITEMENT, STATUT_DOSSIER_REGLE, STATUT_DOSSIER_TRAITE_EN_ATTENTE_REGL } from 'src/app.constants';
import { BordereauFacture } from 'src/app/models/bordereau/bordereau-facture.model';

@Injectable({
  providedIn: 'root'
})
export class BordereauFactureService {
  ELEMENT_BordereauData: BordereauFacture[] = [];
  constructor() { }

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
}