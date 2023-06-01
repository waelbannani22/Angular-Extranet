import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CHAINE_VIDE } from "src/app.constants";
import { XMLTOJSON } from "../helper/xml-tojson.service";

@Injectable({
    providedIn: "root"
})
export class AjoutActeService {
    
       // profileDataPS: ProfileDataPSModel = new ProfileDataPSModel();
      
        constructor(private http: HttpClient, private xmltoJson: XMLTOJSON) { }
      
        // same to profileservice method -- to fix
        getMemberProfileData(matricule: string): Observable<any> { // back office response
          return this.http.post(
            '/api/getContratAdherentByMatricule', matricule, { responseType: 'text' });
        }
      
        // same to profileservice method -- to fix
        getMemberProfileForSearchData(matricule: string): Observable<any> { // back office response
          return this.http.post(
            '/api/getContratAdherentByMatriculeForSearch', matricule, { responseType: 'text' });
        }
      
        getPsProfileData(idTiers: string): Observable<any> {// back office response
          return this.http.post(
            '/api/getContratPsByIdTiers', idTiers, { responseType: 'text' });
        }
      
         getNumContratDataAdh(jsonObj: any): { nomAdh: string, numContrat: string, idAdherent: string } | null {
            // traitements // any type required see: xmlTojson service
            if (jsonObj['Envelope']['Body']['getContratAdherentByMatriculeResponse']) {
              const contratDataAdh = jsonObj['Envelope']['Body']['getContratAdherentByMatriculeResponse']['return'];
              const nomAdh = contratDataAdh['personnePhysique']['nomComplet'];
              const numContrat = (contratDataAdh['numContrat']);
              // to get historique adherent
              const idAdherent = (contratDataAdh['tiers']['id']);
              return {
                'nomAdh': nomAdh,
                'numContrat': numContrat,
                'idAdherent': idAdherent,
              };
            }
            return null;
          }
          
      /*


        getProfileDataPS(jsonObj: any): ProfileDataPSModel {// any type required see : xmlTojson service
          if (jsonObj['Envelope']['Body']['getContratPsByIdTiersResponse']) {
            const dataPs = jsonObj['Envelope']['Body']['getContratPsByIdTiersResponse']['return'];
            this.profileDataPS.matriculeFiscale = dataPs['personneLiberaleDto']['matriculeFiscal'];
            this.profileDataPS.nom = dataPs['personneLiberaleDto']['nom'];
            this.profileDataPS.prenom = dataPs['personneLiberaleDto']['prenom'];
            return this.profileDataPS;
          }
        }
        **/
      
        getMntRemboursementPs(obj: string): Observable<any> { // back office response // obj de tye back office xml ..
          return this.http.post(
            'http://localhost:8089/Stage/acte/getMntRemboursementPs', obj, { responseType: 'text' });
        }
      /*
        getPaiementData(ordonnanceData: Acte, obj: string | Array<string>): Promise<any> {
          return new Promise((resolve, reject) => {
            const id = '{"extranetWsInputDto":[' + obj + ']}';
            this.getMntRemboursementPs(id).subscribe(data => {
              const jsonObj = this.xmltoJson.xmlToJson(data);
              if (jsonObj != null) {
                const RembData = jsonObj['Envelope']['Body']['getMntRemboursementPsResponse']['return'];
                // set value totalOrdonnance
                ordonnanceData['totalOrdenance'] = RembData['mntTotalOrdonnace'];
                // set value MntTicketMod
                ordonnanceData['ticketModerateur'] = RembData['mntTicketModerateur'];
                // set value MntRestePayer
                ordonnanceData['mntRestePayer'] = RembData['mntRestePayer'];
                resolve({ ordonnanceData: ordonnanceData, paiementData: RembData });
              }
            }, err => {
              console.error(err);
            });
          });
        }
         **/
        getPrestationsPsByIdTierPSData(idtiers: string,numPolice:string): Observable<any> { // back office response
            const params:{ idtiers: string, numPolice: string }={
                idtiers:idtiers,
                numPolice:numPolice
              }
            
              const options: { params: { [param: string]: string }, responseType: 'text' } = {
                params: {
                  idtiers: params.idtiers,
                  numPolice: params.numPolice
                },
                responseType: 'text'
              };
            return this.http.post(
            'http://localhost:8089/Stage/acte/getPrestationsPSByIdTiersPS', null,options);
        }
     
        getPrestationsPsByIdTierPsForMCData(idTiers: string, numPolice: string): Observable<any> { // back office response
          const params = {
            'idTiers': idTiers,
            'numPolice': numPolice
          };
          return this.http.post(
            '/api/getPrestationsPsByIdTierPsForMC', params, { responseType: 'text' });
        }
        getMontantDisponibleByBenef(matricule: string, idBenef: string,
            idPs: string, idPrestation?: string): Observable<any> {// any : response back office
            // code spec to fix ! 'Autres'?
            // const plafond = { 'matricule': matricule,'idBenef': idBenef, 'idPs': idBenef };
            /*
            const params:{ numPolice: string }={
             
              numPolice:numPolice
            }
          
            const options: { params: { [param: string]: string }, responseType: 'text' } = {
              params: {
               
                numPolice: params.numPolice
              },
              responseType: 'text'
            };
            **/
            const plafond = { 'matricule': matricule, 'idBenef': idBenef, 'idPs': idPs, 'idPrestation': idPrestation,
            'codeSpec': CHAINE_VIDE, 'codeFamille': CHAINE_VIDE };
            return this.http.post(
              'http://localhost:8089/Stage/acte/getMontantDisponibleByBenef', plafond, {responseType:'text'});
          }
          createLigneFactureTemp(numPolice:string,idBeneficiare:string,idAdherent:string,
            matriculeAdherent:string,dateVisite:string,ticketModerateur:string,mntRestePayer:string,
            idTiers:string,nid:string,json:string,idMedecin:string,reference:string,
            natureActe:string,idPrestation:string
            ){

            const params:{ numPolice:string,idBeneficiare:string,idAdherent:string,
              matriculeAdherent:string,dateVisite:string,ticketModerateur:string,mntRestePayer:string,
              idTiers:string,nid:string,json:string,idMedecin:string,reference:string,
              natureActe:string,idPrestation:string }={

              idBeneficiare:idBeneficiare,
              numPolice:numPolice,
              idAdherent:idAdherent,
              matriculeAdherent:matriculeAdherent,
              dateVisite:dateVisite,
              ticketModerateur:ticketModerateur,
              mntRestePayer:mntRestePayer,
              idTiers:idTiers,
              nid:nid,
              json:json,
              idMedecin:idMedecin,
              reference:reference,
              natureActe:natureActe,
              idPrestation:idPrestation

            }
          
            const options: { params: { [param: string]: string }, responseType: 'text' } = {
              params: {
              idBeneficiare:params.idBeneficiare,
              numPolice:params.numPolice,
              idAdherent:params.idAdherent,
              matriculeAdherent:params.matriculeAdherent,
              dateVisite:params.dateVisite,
              ticketModerateur:params.ticketModerateur,
              mntRestePayer:params.mntRestePayer,
              idTiers:params.idTiers,
              nid:params.nid,
              json:params.json,
              idMedecin:params.idMedecin,
              reference:params.reference,
              natureActe:params.natureActe,
              idPrestation:params.idPrestation
              },
              responseType: 'text'
            };
            return this.http.get('http://192.168.111.102:8080/axis2/services/facturePsWS/createLigneFactureTmp',options)
          }
      
      
}
