import { LigneFacture } from "../ligne-facture.model";

export class ConsultationHistoriqueActeMixte {
    numTrans: string;
    contractant: string;
    matricule: string;
    nomAssure: string;
    nomBenef: string;
    qualiteBenef: string;
    date: string;
    medecin: string;
    discipline: string;
    localite: string;
    conventionne: string;
    statut: number;
    createur: string;
    traitePar: string; 
   

  constructor(
    numTrans: string, 
    contractant: string, 
    matricule: string, 
    nomAssure: string, 
    nomBenef: string, 
    qualiteBenef: string, 
    date: string, 
    medecin: string, 
    discipline: string, 
    localite: string, 
    conventionne: string, 
    statut: number, 
    createur: string, 
    traitePar: string, 
    
) {
    this.numTrans = numTrans
    this.contractant = contractant
    this.matricule = matricule
    this.nomAssure = nomAssure
    this.nomBenef = nomBenef
    this.qualiteBenef = qualiteBenef
    this.date = date
    this.medecin = medecin
    this.discipline = discipline
    this.localite = localite
    this.conventionne = conventionne
    this.statut = statut
    this.createur = createur
    this.traitePar = traitePar
    
  }    

}
