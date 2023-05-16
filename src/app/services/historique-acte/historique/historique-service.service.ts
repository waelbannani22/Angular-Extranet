import { Injectable } from '@angular/core';
import { CHAINE_VIDE, CODE_RUBRIQUE_BIOLOGISTE, CODE_RUBRIQUE_PHARMACIEN, CODE_RUBRIQUE_RADIOLOGIE, CONS_FACTURE } from 'src/app.constants';
import { HistoriqueActe } from 'src/app/models/bordereau/historique-acte.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  ELEMENT_DATA_consultationHistory: HistoriqueActe[] = [];

  constructor() { }

  createElementHistorique(jsonObjfact: any): HistoriqueActe[] {// any type required see : xmlTojson service
    this.ELEMENT_DATA_consultationHistory = [];
    const historiqueData =
      jsonObjfact['Envelope']['Body']['getFactureBordereauByIdTierResponse']['return']['factureBordereauByIdTiersDtos'];
    if (!historiqueData['empty']) {
      if (historiqueData.length > 1) {
        for (const key in historiqueData) {
          if (historiqueData.hasOwnProperty(key)) {
            this.ELEMENT_DATA_consultationHistory.push({
              numTransaction: historiqueData[key]['referenceFactureBordereau'],
              numBorderau: historiqueData[key]['reference'],
              matriculeAssure: historiqueData[key]['matriculeAdherent'],
              nomAssure: historiqueData[key]['adherent'],
              nombeneficiaire: historiqueData[key]['beneficiaire'],
              medecin: CHAINE_VIDE,
              numConsultation: historiqueData[key]['referenceExtranet'] === 0 ? historiqueData[key]['referenceFactureBordereau'] : historiqueData[key]['referenceExtranet'],
              datetransaction: historiqueData[key]['dateTransaction'],
              montantTicketModerateur: historiqueData[key]['mntTicktModerateur'],
              restePayer: historiqueData[key]['mntRestePayer'],
              statut: this.getStatut(historiqueData[key]['factureTmp']),
              qualite: historiqueData[key]['qualite'],
              natureTransaction: this.getPrestationNature(historiqueData[key]['natureTransaction']),
              // typePrestation: this.getPrestationType(historiqueData[key]['typePrestation']),
              typePrestation: historiqueData[key]['typePrestation'],
              commentaire: historiqueData[key]['commentaire'],
              totalMedRemb: historiqueData[key]['totalMedRemboursable'],
              totalMedNonRemb: historiqueData[key]['totalMedNonRemboursable'],
              totalOrd: historiqueData[key]['totalOrdonnance'],
              nbCotationB: historiqueData[key]['nbCotationB'],
              nbCotationABP: historiqueData[key]['nbCotationABP'],
              nbCotation: historiqueData[key]['nbCotation'],
              cleCotation: historiqueData[key]['cleCotation'],
              natureActe: historiqueData[key]['natureActe']
            });
          }
        }
      } else { // length =1
        this.ELEMENT_DATA_consultationHistory.push({
          numTransaction: historiqueData['referenceFactureBordereau'],
          numBorderau: historiqueData['reference'],
          matriculeAssure: historiqueData['matriculeAdherent'],
          nomAssure: historiqueData['adherent'],
          nombeneficiaire: historiqueData['beneficiaire'],
          medecin: CHAINE_VIDE,
          numConsultation: historiqueData['referenceExtranet'] === 0 ? historiqueData['referenceFactureBordereau'] : historiqueData['referenceExtranet'],
          datetransaction: historiqueData['dateTransaction'],
          montantTicketModerateur: historiqueData['mntTicktModerateur'],
          restePayer: historiqueData['mntRestePayer'],
          statut: this.getStatut(historiqueData['factureTmp']),
          qualite: historiqueData['qualite'],
          natureTransaction: this.getPrestationNature(historiqueData['natureTransaction']),
          // typePrestation: this.getPrestationType(historiqueData['typePrestation']),
          typePrestation: historiqueData['typePrestation'],
          commentaire: historiqueData['commentaire'],
          totalMedRemb: historiqueData['totalMedRemboursable'],
          totalMedNonRemb: historiqueData['totalMedNonRemboursable'],
          totalOrd: historiqueData['totalOrdonnance'],
          nbCotationB: historiqueData['nbCotationB'],
          nbCotationABP: historiqueData['nbCotationABP'],
          nbCotation: historiqueData['nbCotation'],
          cleCotation: historiqueData['cleCotation'],
          natureActe: historiqueData['natureActe']
        });
      }
    }
    return this.ELEMENT_DATA_consultationHistory;
  }
  getStatut(statut: string): string {
    if (statut) {
      return 'Non facturé';
    } else {
      return 'Facturé';
    }
  }
  // status --> to fix to delete : prest : multiple type !!!
  getPrestationType(caseStatus: string): string {
    let PrestationType;
    switch (caseStatus) {
      case CODE_RUBRIQUE_PHARMACIEN:
        PrestationType = 'Pharmacie';
        break;
      case CODE_RUBRIQUE_BIOLOGISTE:
        PrestationType = 'Bilogie';
        break;
      case CODE_RUBRIQUE_RADIOLOGIE:
        PrestationType = 'Radiologie';
        break;
      default:
        PrestationType = 'Autres';
        break;
    }
    return PrestationType;
  }
  getPrestationNature(caseStatus: string): string {
    let PrestationNature;
    if (caseStatus === CONS_FACTURE) {
      PrestationNature = 'Consultation';
    } else {
      PrestationNature = 'Contrôle';
    }
    return PrestationNature;
  }
}