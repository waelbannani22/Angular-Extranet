import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CHAINE_VIDE, CONS_FACTURE } from "src/app.constants";
import { XMLTOJSON } from "src/app/helper/xml-tojson.service";
import { ConsultationHistoriqueActeMixte } from "src/app/models/Consultation/consultation-historique-acte-mixte.model";
import { LigneFacture } from "src/app/models/ligne-facture.model";

@Injectable({
    providedIn: 'root'
  })
  export class HistoriqueActeCircuitMixteService {
    medecin!: string;
    discipline!: string;
    localite!: string;
    nomAdherent!: string;
    qualitebenef!: string;
    nomBeneficiare!: string;
    createur!: string;
    ELEMENT_DATA_consultationHistory!: ConsultationHistoriqueActeMixte[];
    bordereau_DATA!:ConsultationHistoriqueActeMixte[]
  
    constructor(private http: HttpClient, private xmltoJson: XMLTOJSON) { }
    // create elemnts of table
    createElementHistorique(elements: Array<LigneFacture>): ConsultationHistoriqueActeMixte[] {
      this.ELEMENT_DATA_consultationHistory = [];
      if (elements.length >= 1) {
        elements.forEach(element => {
          if (element['natureTransaction'] === CONS_FACTURE) {
            const medecin = element['nomMedecin'];
            this.fDataMedecin(element).then(res => this.fDataAdherent(element)).then(res => this.fDataLigneFacture(element, medecin));
          }
        });
      }
      return this.ELEMENT_DATA_consultationHistory;
    }
    // ligne facture : données médecin
    fDataMedecin(element: LigneFacture): Promise<string> {
      return new Promise((resolve, reject) => {
        // get matricule Createur
        this.getPsProfileData(element['idTiers']) // createur id Tiers / idMedecin : medecin selectionné
          .subscribe((dataPs: any) => {
            const jsonObjPs = this.xmltoJson.xmlToJson(dataPs);
            if (jsonObjPs != null) {
              if (!jsonObjPs['Envelope']['Body']['Fault']) {
                this.createur = jsonObjPs['Envelope']['Body']['getContratPsByIdTiersResponse']['return']
                ['personneLiberaleDto']['infoComp']['codeCnam'].concat('-', jsonObjPs['Envelope']['Body']
                ['getContratPsByIdTiersResponse']['return']
                ['personneLiberaleDto']['nomComplet']);
              }
              resolve('We finished step 1');
            }
          });
      });
    }
  
    // ligne facture : données Adhérent
    fDataAdherent(element: LigneFacture): Promise<string> {
      return new Promise((resolve, reject) => {
        // if we need circuitMixte :: we use getMemberData
        // nomAdherent // nom benef //qualite
        // console.info('MATRICULE VALUE >>>', element['matriculeAdherent']);
        this.getMemberProfileForSearchData(element['matriculeAdherent']).subscribe((dataMember: any) => {
          const jsonObj = this.xmltoJson.xmlToJson(dataMember);
          if (jsonObj != null) {
            // nomAdherent // nom benef //qualite
            this.nomAdherent = this.getAssureData(element, jsonObj)['nomAdherent'];
            this.qualitebenef = this.getAssureData(element, jsonObj)['qualitebenef'];
            this.nomBeneficiare = this.getAssureData(element, jsonObj)['nomBeneficiare'];
            resolve('We finished step 2');
          }
        });
      });
    }
  
    // ligne facture : élement
    fDataLigneFacture(element: LigneFacture, medecin: string): Promise<string> {
      return new Promise((resolve, reject) => {
        // medecin non conventionne data
        if (element['idMedecin']) {
          this.getPsByNomOrCodeCnam(medecin).subscribe((dataMedcin: any) => {
            const medcinDataJson = this.xmltoJson.xmlToJson(dataMedcin);
            if (medcinDataJson != null) {
              this.discipline = medcinDataJson['Envelope']['Body']['getPsByNomOrCodeCnamResponse']['return']['libelleCodeSpec'];
              this.localite = medcinDataJson['Envelope']['Body']['getPsByNomOrCodeCnamResponse']['return']['libelleAdressePrincipale'];
              this.ELEMENT_DATA_consultationHistory.push(new ConsultationHistoriqueActeMixte(element['reference'],
                element['contractant'], element['matriculeAdherent'], this.nomAdherent, this.nomBeneficiare,
                this.qualitebenef, element['dateVisite'], medecin,
                this.discipline,
                this.localite,
                'Non', element['statut'],
                this.createur,
                element['traitePar'],
                )); // conventionne : to fix !
                resolve('');
            }
          });
        } else { // to fix
          this.ELEMENT_DATA_consultationHistory.push(new ConsultationHistoriqueActeMixte(element['reference'],
            element['contractant'], element['matriculeAdherent'], this.nomAdherent, this.nomBeneficiare,
            this.qualitebenef, element['dateVisite'], medecin,
            CHAINE_VIDE,
            CHAINE_VIDE,
            'Non', element['statut'],
            this.createur,
            element['traitePar'],
            )); // conventionne : to fix !
          resolve('We finished last step');
        }
      });
    }
  
    // nomAdherent // nom benef //qualite
    getAssureData(element: LigneFacture, jsonObj: any): { nomAdherent: string, qualitebenef: string, nomBeneficiare: string } {
      // any type required see : xmlTojson service
      let qualitebenef;
      let nomAdherent;
      let nomBeneficiare;
      let roles: any;
      const oneBenef: Array<object> = [];
      // Handle error
      if (jsonObj != null && !jsonObj['Envelope']['Body']['Fault']) {
        if (Array.isArray(jsonObj['Envelope']['Body']['getContratAdherentByMatriculeResponse']['return']['roles'])) {
          roles = jsonObj['Envelope']['Body']['getContratAdherentByMatriculeResponse']['return']['roles'];
       } else {
         oneBenef.push(jsonObj['Envelope']['Body']['getContratAdherentByMatriculeResponse']['return']['roles']);
         roles = oneBenef;
       }
        for (const key in roles) {
          if (roles.hasOwnProperty(key)) {
            // === didn't work
            // tslint:disable-next-line:triple-equals
            if (element['idAdherent'] == roles[key]['tiers']['id']) {
              nomAdherent = roles[key]['personnePhysique']['nomComplet'];
              qualitebenef = roles[key]['qualite']['libelle'];
            }
            // tslint:disable-next-line:triple-equals
            if (element['idBeneficiare'] == roles[key]['tiers']['id']) {
              nomBeneficiare = roles[key]['personnePhysique']['nomComplet'];
              qualitebenef = roles[key]['qualite']['libelle'];
            }
          }
        }
      }
  
      return {
        'nomAdherent': nomAdherent,
        'qualitebenef': qualitebenef,
        'nomBeneficiare': nomBeneficiare
      };
    }
  
  
    // Jee DB // pagination : http response
    getLignesFactures(page: number, pagesize: number, criteria: string): Observable<HttpResponse<Array<LigneFacture>>> {
      let params = new HttpParams();
      params = params.append('page', page.toString());
      params = params.append('pagesize', pagesize.toString());
      params = params.append('criteria', criteria);
      return this.http.get<Array<LigneFacture>>('/api/ligne-factures-active-account',
        { observe: 'response', params });
    }
  
    getMemberData(matricule: string): Observable<any> {
      return this.http.post(
        '/api/getContratAdherentByMatricule', matricule, { responseType: 'text' });
    }
  
    getMemberProfileForSearchData(matricule: string): Observable<any> { // back office response
      return this.http.post(
        '/api/getContratAdherentByMatriculeForSearch', matricule, { responseType: 'text' });
    }
  
    // get Doctor Data
    getPsByNomOrCodeCnam(searchCriteria: string): Observable<any> {
      return this.http.post(
        '/api/getPsByNomOrCodeCnam', searchCriteria, { responseType: 'text' });
    }
  
    // to get matricule créateur par idTiers
    getPsProfileData(idTiers: string): Observable<any> {
      return this.http.post(
        '/api/getContratPsByIdTiers', idTiers, { responseType: 'text' });
    }
    addToTable(data: any): ConsultationHistoriqueActeMixte[] {
        this.bordereau_DATA = [];
        console.log("in add table\n");
        try {
          if (data) {
            const bordereauJson =
              data['Envelope']['Body']['getFactureBordereauByIdAdherentResponse']['return'];
            if (bordereauJson && !bordereauJson['empty']) {
              if (Array.isArray(bordereauJson)) {
                for (const item of bordereauJson) {
                  this.bordereau_DATA.push({
                    numTrans: item['referenceFactureBordereau'],
                    date: item['dateTransaction'],
                    nomAssure: item['adherent'],
                    nomBenef: item['beneficiaire'],
                    medecin: item['ps'],
                    contractant: "",
                    matricule: "",
                    qualiteBenef: "",
                    discipline: "",
                    localite: "",
                    conventionne: "",
                    statut: 0,
                    createur: "",
                    traitePar: "",
                  });
                }
              } else {
                this.bordereau_DATA.push({
                  numTrans: bordereauJson['referenceFactureBordereau'],
                  date: bordereauJson['dateTransaction'],
                  nomAssure: bordereauJson['adherent'],
                  nomBenef: bordereauJson['beneficiaire'],
                  medecin: bordereauJson['ps'],
                  contractant: "",
                  matricule: "",
                  qualiteBenef: "",
                  discipline: "",
                  localite: "",
                  conventionne: "",
                  statut: 0,
                  createur: "",
                  traitePar: "",
                });
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      
        return this.bordereau_DATA;
      }
      
  }