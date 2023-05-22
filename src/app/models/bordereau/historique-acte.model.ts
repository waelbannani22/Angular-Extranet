export class Historique{
    numTransaction!: string;
    matriculeAssure!: string;
    nomAssure!: string;
    nombeneficiaire!: string;
    datetransaction!: string;
    montantTicketModerateur!: number;
    restePayer!: number;
}
export class HistoriqueActe extends Historique {
    numConsultation!: string;
    medecin!: string;
    numBorderau!: string;
    statut!: string;
    qualite!: string;
    natureTransaction!: string;
    typePrestation!: string;
    commentaire!: string;
    totalMedRemb!: string;
    totalMedNonRemb!: string;
    totalOrd!: string;
    nbCotationB!: string;
    nbCotationABP!: string;
    nbCotation!: string;
    cleCotation!: string;
    natureActe!: string;
    id!:string
}

