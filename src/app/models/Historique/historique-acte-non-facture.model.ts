import { Historique } from "../bordereau/historique-acte.model";

export class HistoriqueActeNonFacture extends Historique{
    id!:string;
    medecin!:string
    numConsultation!:string
}
