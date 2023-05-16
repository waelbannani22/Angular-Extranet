import { Injectable } from '@angular/core';
import { HistoriqueActeNonFacture } from 'src/app/models/Historique/historique-acte-non-facture.model';

@Injectable({
  providedIn: 'root'
})
export class NonFactureesGeneriqueService {
  ELEMENT_DATA_consultationHistoryNonFacture: HistoriqueActeNonFacture[] = [];

  constructor() { }
  // table Non facturées
  createElementsNonFacture(jsonObjfact: any): HistoriqueActeNonFacture[] {// any type required see : xmlTojson service
    this.ELEMENT_DATA_consultationHistoryNonFacture = [];
    const nonFactureData =
      jsonObjfact['Envelope']['Body']['getFactureBordereauByIdTierResponse']['return']['factureBordereauByIdTiersDtos'];

    if (!nonFactureData['empty']) {
      if (nonFactureData.length > 1) {
        for (const key in nonFactureData) {
          if (nonFactureData.hasOwnProperty(key)) {
            this.ELEMENT_DATA_consultationHistoryNonFacture.push({
              numTransaction: nonFactureData[key]['referenceFactureBordereau'],
              matriculeAssure: nonFactureData[key]['matriculeAdherent'],
              nomAssure: nonFactureData[key]['adherent'],
              nombeneficiaire: nonFactureData[key]['beneficiaire'],
              medecin: nonFactureData[key]['ps'],
              numConsultation: nonFactureData[key]['referenceExtranet'],
              datetransaction: nonFactureData[key]['dateTransaction'],
              montantTicketModerateur: nonFactureData[key]['mntTicktModerateur'],
              restePayer: nonFactureData[key]['mntRestePayer'],
              id: nonFactureData[key]['id']
            });
          }
        }
      } else {
        this.ELEMENT_DATA_consultationHistoryNonFacture.push({
          numTransaction: nonFactureData['referenceFactureBordereau'],
          matriculeAssure: nonFactureData['matriculeAdherent'],
          nomAssure: nonFactureData['adherent'],
          nombeneficiaire: nonFactureData['beneficiaire'],
          medecin: nonFactureData['ps'],
          numConsultation: nonFactureData['referenceExtranet'],
          datetransaction: nonFactureData['dateTransaction'],
          montantTicketModerateur: nonFactureData['mntTicktModerateur'],
          restePayer: nonFactureData['mntRestePayer'],
          id: nonFactureData['id']
        });
      }
    }
    return this.ELEMENT_DATA_consultationHistoryNonFacture;
  }

}