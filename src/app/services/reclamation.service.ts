import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { SuggestionsReclamations } from 'shared/models/suggestions-reclamations.models';
import { CASE_RECLAMATION_ARCHIVE, CASE_RECLAMATION_DEMANDE, CASE_RECLAMATION_EN_ATTENTE,
  CASE_RECLAMATION_EN_COURS, CASE_RECLAMATION_INFO_COMP, CHAINE_VIDE, CONCERNE_POLICE,
  CONCERNE_PS, STATUT_RECLAMATION_ENCOURS, STATUT_RECLAMATION_REPONSE, STATUT_RECLAMATION_TRAITE } from 'src/app.constants';
import { SuggestionsReclamation } from './models/suggestions-reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsReclamationsService {

 // elementDataListPJ: PieceJointe[] = [];
  elementDataDossier: SuggestionsReclamation[] = [];
  // rest API to be eliminated later
  constructor(private http: HttpClient) { }
 /* sentSuggComp(formData: FormData): Observable<SuggestionsReclamations> {
    return this.http.post<SuggestionsReclamations>('/api/suggestions-reclamations', formData);
  }

  updateSuggComp(formData: FormData): Observable<SuggestionsReclamations> {
    return this.http.post<SuggestionsReclamations>('/api/suggestions-reclamations-reponse', formData);
  }
*/
  // Jee DB
  /*
  getSuggestionsReclamations(page: number, pagesize: number, dateDebut: string, dateFin: string,
    matricule: string, selected_statut: string, selected_type: string,
    numPolice: string): Observable<HttpResponse<Array<SuggestionsReclamations>>> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pageSize', pagesize.toString());
    params = params.append('dateDebut', dateDebut ? (dateDebut.trim()).toLowerCase() : CHAINE_VIDE);
    params = params.append('dateFin', dateFin ? (dateFin.trim()).toLowerCase() : CHAINE_VIDE);
    params = params.append('matricule', matricule ? matricule.trim().toLowerCase() : CHAINE_VIDE);
    params = params.append('statut', selected_statut);
    params = params.append('type', selected_type);
    params = params.append('numPolice', numPolice ? numPolice.trim().toUpperCase() : CHAINE_VIDE);
    return this.http.get<Array<SuggestionsReclamations>>('/api/suggestions-reclamations', { observe: 'response', params });
  }
*/
  // BO WS
  getReclamationPJ(idReclamation: string): Observable<any> {
    return this.http.post(
      '/api/getReclamationPJ',
      idReclamation,
      { responseType: 'text' }
    );
  }


  getListReclamationByMatricule(page: number, pageSize: number, dateMinRec: string,
    dateMaxRec: string, numReclamtion: string, entite:  number, numPolice: string,
    nomPS: string, TypeRecl: string, nature: string, staut: string, matriculeAdherent: string,
    matriculePs: string): Observable<any> {

      const params = {
        'page': page.toString(),
        'pageSize': pageSize.toString(),
        'dateMinRec': dateMinRec ? (dateMinRec.trim()).toLowerCase() : CHAINE_VIDE,
        'dateMaxRec': dateMaxRec ? (dateMaxRec.trim()).toLowerCase() : CHAINE_VIDE,
        'numReclamtion': numReclamtion ? numReclamtion.trim() : CHAINE_VIDE,
        'entite': entite.toString(),
        'nomPS': nomPS ? nomPS.trim().toUpperCase() : CHAINE_VIDE,
        'numPolice': numPolice ? numPolice.trim() : CHAINE_VIDE,
        'typeRecl': TypeRecl ? TypeRecl.toString().trim() : CHAINE_VIDE,
        'nature': nature ? nature.trim() : CHAINE_VIDE,
        'staut': staut ? staut.trim() : CHAINE_VIDE,
        'matriculeAdherent': matriculeAdherent ? matriculeAdherent.trim() : CHAINE_VIDE,
        'matriculePs': matriculePs ? matriculePs.trim() : CHAINE_VIDE
      };
       console.info('TYPE RECL >>>', params);
    return this.http.post(
      'http://localhost:8089/Stage/soapWs/getListReclamationByMatricule',
      params,
      { responseType: 'text' }
    );
  }

  getDataListReclamationByMatricule(jsonObj: any): SuggestionsReclamation[] {
    // any type required see : xmlTojson service
    this.elementDataDossier = [];
    if (jsonObj['Envelope']['Body']['getListReclamationByMatriculeResponse']) {
      const dossierData =
        jsonObj['Envelope']['Body']['getListReclamationByMatriculeResponse']['return'][
        'listResultDto'
        ];
      if (dossierData['empty'] !== true) {
        if (dossierData.length > 1) {
          for (const key in dossierData) {
            if (dossierData.hasOwnProperty(key)) {
              this.elementDataDossier.push({
                idReclamation: dossierData[key]['id'],
                titre: dossierData[key]['objetReclamation'],
                description: dossierData[key]['descreptionReclamation'] !== 'null' ? dossierData[key]['descreptionReclamation'] : '-',
                dateMinRec: dossierData[key]['dateCreation'],
                dateMaxRec: dossierData[key]['dateModification'],
                numReclamtion: dossierData[key]['numeroReclamation'],
                numPolice: this.getNumPolice(dossierData[key]['concerrne']),
                nomPS: this.getNomPs(dossierData[key]['concerrne']),
                TypeRecl: dossierData[key]['typeReclamation']['libelle'],
                nature: dossierData[key]['natureReclamation'],
                staut: parseInt(this.getStatutBackOffice(dossierData[key]['taskName'])),
                matriculeAdherent: dossierData[key]['matriculeAdherent'],
                matriculePs: dossierData[key]['matriculePs'],
                entite: dossierData[key]['entite'],
                motif: dossierData[key]['motif']['libelle'],
                noteMotif: dossierData[key]['noteMotif'],
                reponseExtranet: dossierData[key]['reponseExtarnet'],
                reponseGestionnaire: dossierData[key]['reponseGestionnaire'],
              });
            }
          }
        } else {
          this.elementDataDossier.push({
            idReclamation: dossierData['id'],
            titre: dossierData['objetReclamation'],
            description: dossierData['descreptionReclamation'],
            dateMinRec: dossierData['dateCreation'],
            dateMaxRec: dossierData['dateModification'],
            numReclamtion: dossierData['numeroReclamation'],
            numPolice: this.getNumPolice(dossierData['concerrne']),
            nomPS: this.getNomPs(dossierData['concerrne']),
            TypeRecl: dossierData['typeReclamation']['libelle'],
            nature: dossierData['natureReclamation'],
            staut: parseInt(this.getStatutBackOffice(dossierData['taskName'])),
            matriculeAdherent: dossierData['matriculeAdherent'],
            matriculePs: dossierData['matriculePs'],
            entite: dossierData['entite'],
            motif: dossierData['motif']['libelle'],
            noteMotif: dossierData['noteMotif'],
            reponseExtranet: dossierData['reponseExtarnet'],
            reponseGestionnaire: dossierData['reponseGestionnaire'],
          });
        }
      }
    }
    return this.elementDataDossier;
  }

  // create Réclamation
  createReclamation(byteFile: any, nameFile: string, typeFile: string,
    matriculeAdherent: string, matriculePs: string, numPolice: string,
    nomPs: string, description: string, entite: string,
    titre: string, nature: string, typeReclamation: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('byteFile', byteFile);
    formData.append('nameFile', nameFile);
    formData.append('typeFile', typeFile);
    formData.append('matriculeAdherent', matriculeAdherent);
    formData.append('matriculePs', matriculePs);
    formData.append('numPolice', numPolice);
    formData.append('nomPs', nomPs);
    formData.append('description', description);
    formData.append('entite', entite);
    formData.append('titre', titre);
    formData.append('nature', nature);
    formData.append('typeReclamation', typeReclamation);
    return this.http.post('/api/createReclamation', formData, { responseType: 'text' });
  }

  // create Réclamation
  updateReclamationExtranet(id: string, reponseExtranet: string,
    byteFile: any, typeFile: string, nameFile: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('reponseExtranet', reponseExtranet);
    formData.append('byteFile', byteFile);
    formData.append('typeFile', typeFile);
    formData.append('nameFile', nameFile);
    return this.http.post('/api/updateReclamationExtranet', formData, { responseType: 'text' });
  }

  getStatutBackOffice(statut: string): string {
    let statutFinal = '';
    // console.info('bo statut >>>', statut);
    switch (statut.trim()) {
      case CASE_RECLAMATION_EN_ATTENTE:
        statutFinal = STATUT_RECLAMATION_ENCOURS;
        break;
      case CASE_RECLAMATION_EN_COURS:
        statutFinal = STATUT_RECLAMATION_ENCOURS;
        break;
      case CASE_RECLAMATION_DEMANDE:
        statutFinal = STATUT_RECLAMATION_ENCOURS;
        break;
      case CASE_RECLAMATION_INFO_COMP:
        statutFinal = STATUT_RECLAMATION_REPONSE;
        break;
      case CASE_RECLAMATION_ARCHIVE:
        statutFinal = STATUT_RECLAMATION_TRAITE;
        break;
    }
    // console.info('bo statut >>>', statutFinal);
    return statutFinal;
  }

  getNumPolice(concerne: string) {
    if (concerne === CONCERNE_POLICE) {
      return concerne;
    } else {
      return CHAINE_VIDE;
    }
  }

  getNomPs(concerne: string) {
    if (concerne === CONCERNE_PS) {
      return concerne;
    } else {
      return CHAINE_VIDE;
    }
  }
}
