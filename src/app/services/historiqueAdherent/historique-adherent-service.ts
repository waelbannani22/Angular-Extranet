import { HttpClient, HttpResponse,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAINE_VIDE, CONS_FACTURE, CONT_FACTURE } from 'src/app.constants';
import { LigneFacture } from 'src/app/models/ligne-facture.model';
import { HistoriqueActeCircuitMixteService } from '../historiqueActeMixte/historique-acte-circuit-mixte-service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class HistoriqueAdherentService {
  _historiqueAdherent_LigneTable: any;
  details = {}; //
  consultationAdPs: any[] = [];
  dataNgx: any[] = [];
  historiqueToEdit: Array<LigneFacture> = [];
  constructor(
    private http: HttpClient,
    private HistoriqueCircuitMixteService: HistoriqueActeCircuitMixteService,
    
  ) {}

  // Jee DB
  getLignesFactures(
    matricule: string
  ): Observable<HttpResponse<Array<LigneFacture>>> {
    let params = new HttpParams();
    params = params.append('criteria', matricule);
    // to fix : /ligne-factures-circuit-mixte-traiter (statut -1/1) càd validé /refusé
    return this.http.get<Array<LigneFacture>>(
      '/api/ligne-factures-circuit-mixte-traiter',
      { observe: 'response', params }
    );
  }

  getFactureBordereauByIdAdherent(
    id: string,
    idPs: string,
    page: number,
    pagesize: number
  ): Observable<any> {
    // any type required see : xmlTojson service
    return this.http.post(
      'http://localhost:8089/Stage/acte/getFactureBordereauByIdAdherent',
      { id: id, page: page, idPs: idPs, pagesize: pagesize },
      { responseType: 'text' }
    );
  }
  /***********************************historique Jee DB**********************************************/
  /*
  histCircuitMixte(
    historiqueCircuitMixte: Array<LigneFacture>,
    matricule: string,
    //contractant: Contractant
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // appel service historique cercuit mixte
      // delete duplicated data "idTiers diff idMedecin" , just for current search user "matricule"
      for (const Key in historiqueCircuitMixte) {
        if (
          historiqueCircuitMixte[Key]['idTiers'] !==
            historiqueCircuitMixte[Key]['idMedecin'] &&
          historiqueCircuitMixte[Key]['matriculeAdherent'] === matricule 
          //&&
         // historiqueCircuitMixte[Key]['contractant']['id'] === contractant['id']
        ) {
          this.historiqueToEdit.push(historiqueCircuitMixte[Key]);
        }
      }
      const elements =
        this.HistoriqueCircuitMixteService.createElementHistorique(
          this.historiqueToEdit
        );
      setTimeout(() => {
        // add data to table
        for (const key in elements) {
          if (elements.hasOwnProperty(key)) {
            this._historiqueAdherent_LigneTable = {
              'N° Consultation': elements[key]['reference'],
              Date: elements[key]['date'],
              "Nom de l'assuré": elements[key]['nomAssure'],
              'Nom du Bénéficiaire': elements[key]['nomBenef'],
              Médecin: elements[key]['medecin'],
              add: elements[key]['add'],
              details: [],
            };
            this.dataNgx.push(this._historiqueAdherent_LigneTable);
          }
        }
        resolve('We finished Jee DB Lfactures');
      }, 15000);
    });
  }
*/
  /***********************************historique back office **********************************************/
  histBackOffice(jsonObjfact: any, idTiers: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const factureData =
        jsonObjfact['Envelope']['Body'][
          'getFactureBordereauByIdAdherentResponse'
        ]['return'];
      // console.info('FACTURE DATA >>>', factureData);
      if (jsonObjfact != null && factureData !== CHAINE_VIDE) {
        if (factureData.length > 1) {
          for (const key in factureData) {
            if (
              (factureData[key]['natureActe'] === 'Consultation dentaire' ||
                factureData[key]['natureTransaction'] === CONS_FACTURE) &&
              this.dataNgx.length < 10
            ) {
              // console.info('FROM WS >>', typeof factureData[key]['idTiers']);
              // console.info('FROM INPUT >>', typeof idTiers);
              // condition autorisation l'ajout du consultation
              if (factureData[key]['idTiers'].toString() === idTiers) {
                // === not work
                this.consultationAdPs.push(factureData[key]);
              }

              this._historiqueAdherent_LigneTable = {
                'N° Consultation':
                  factureData[key]['referenceFactureBordereau'],
                Date:
                  factureData[key]['dateTransaction']
                ,
                "Nom de l'assuré": factureData[key]['adherent'],
                'Nom du Bénéficiaire': factureData[key]['beneficiaire'],
                Médecin: factureData[key]['ps'],
                add: factureData[key],
                couldAddCont:
                  factureData[key]['idTiers'].toString() === idTiers, // === not work
                // Permettre l'ajout acte de type contrôle que au médecin qui ajoute la consultation
                details: [],
              };
              this.dataNgx.push(this._historiqueAdherent_LigneTable);
              for (const det in factureData) {
                if (
                  factureData[det]['natureTransaction'] === CONT_FACTURE &&
                  factureData[det]['referenceExtranet'] ===
                    factureData[key]['referenceFactureBordereau']
                ) {
                  // details
                  this._historiqueAdherent_LigneTable.details.push(
                    this.getDetails(factureData, det, idTiers)
                  );
                  // this.details={};
                }
              }
              this._historiqueAdherent_LigneTable.details.push();
            }
          }
        } else {
          // length ==1
          if (
            factureData['natureActe'] === 'Consultation dentaire' ||
            factureData['natureTransaction'] === CONS_FACTURE
          ) {
            //  condition autorisation l'ajout du consultation // === not work
            if (factureData['idTiers'].toString() === idTiers) {
              // === not work
              this.consultationAdPs = factureData;
            }

            this._historiqueAdherent_LigneTable = {
              'N° Consultation': factureData['referenceFactureBordereau'],
              Date:factureData['dateTransaction'],
              "Nom de l'assuré": factureData['adherent'],
              'Nom du Bénéficiaire': factureData['beneficiaire'],
              Médecin: factureData['ps'],
              couldAddCont: factureData['idTiers'].toString() === idTiers, // === not work
              // Permettre l'ajout acte de type contrôle que au médecin qui ajoute la consultation
              add: factureData,
              details: [],
            };
            this.dataNgx.push(this._historiqueAdherent_LigneTable);
            for (const det in factureData) {
              if (
                factureData[det]['natureTransaction'] === CONT_FACTURE &&
                factureData[det]['referenceExtranet'] ===
                  factureData['referenceFactureBordereau']
              ) {
                // details
                this._historiqueAdherent_LigneTable.details.push(
                  this.getDetails(factureData, det, idTiers)
                );
                // this.details={};
              }
            }
            this._historiqueAdherent_LigneTable.details.push();
          }
        }
        resolve('We finished Back office Lfactures');
      }
    });
  }

  createElementsData(
    jsonObjfact: any,
    historiqueCircuitMixte: Array<LigneFacture>,
    idTiers: string,
    matricule: string,
   
  ): any {
    // { 'dataNgx': any, 'consultationAdPs': any }
    this._historiqueAdherent_LigneTable = [];
    this.consultationAdPs = [];
    this.dataNgx = [];
    this.historiqueToEdit = [];
    // this.histCircuitMixte(historiqueCircuitMixte, matricule, contractant).then(res => this.histBackOffice(jsonObjfact, idTiers));
    this.histBackOffice(jsonObjfact, idTiers);
    return { dataNgx: this.dataNgx, consultationAdPs: this.consultationAdPs };
    // }, TIME_OUT); // time out to fix !!!
    // return { 'dataNgx': this.dataNgx }
  }

  getDetails(jsonObjfact: any, det: string, idTiers: string): {} {
    // to update (amelioration)
    this.details = {
      'N° Consultation': jsonObjfact[det]['referenceFactureBordereau'],
      Date: jsonObjfact[det]['dateTransaction'],
      "Nom de l'assuré": jsonObjfact[det]['adherent'],
      'Nom du Bénéficiaire': jsonObjfact[det]['beneficiaire'],
      Médecin: jsonObjfact[det]['ps'],
      couldAddCont: jsonObjfact[det]['idTiers'] === idTiers, // === not work
      // Permettre l'ajout acte de type contrôle que au médecin qui ajoute la consultation
      add: jsonObjfact[det],
    };
    return this.details;
  }
}
