export interface LFacture {
  contractant: string;
  numConsultation:string
  idBeneficiare: string;
  matriculeAdherent: string;
  dateVisite: string;
  ticketModerateur: string;
  mntRestePayer: string;
  idTiers: string;
  totalOrdenance: string;
  totalMedRemboursable: string;
  totalMedNonRemboursable: string;
  commentaire: string;
  dateConsultation: string;
  reference: string;
  idMedecin: string;
  typePrestation: string;
  idAdherent: string;
  nbreCoatationB: string;
  nbreCoatationABP: string;
  nbreCoatation: string;
  cleCotation: string;
  natureActe: string;
}
export class LigneFacture implements LFacture {
  matriculeAdherent: string
  
  idAdherent: string
  contractant: string
  user: string
  idBeneficiare: string
  matriculeAdheren: string
  dateVisite: string
  ticketModerateur: string
  mntRestePayer: string
  idTiers: string
  totalOrdenance: string
  totalMedRemboursable: string
  totalMedNonRemboursable: string
  commentaire: string
  dateConsultation: string
  reference: string
  idMedecin: string
  typePrestation: string
  id: string
  nid: string
  nbreCoatationB: string
  nbreCoatationABP: string
  nbreCoatation: string
  cleCotation: string
  natureTransaction: string
  natureActe: string
  statut: number // valider ou non
  nomMedecin: string // circuit mixte
  traitePar: string // traité par : nom gestionnaire
  idPrestation: string
  numConsultation: string;
  constructor(
    matriculeAdherent: string, 
    numConsultation:string,
    idAdherent: string, 
    contractant: string, 
    user: string, 
    idBeneficiare: string, 
    matriculeAdheren: string, 
    dateVisite: string, 
    ticketModerateur: string, 
    mntRestePayer: string, 
    idTiers: string, 
    totalOrdenance: string, 
    totalMedRemboursable: string, 
    totalMedNonRemboursable: string, 
    commentaire: string, 
    dateConsultation: string, 
    reference: string, 
    idMedecin: string, 
    typePrestation: string, 
    id: string, 
    nid: string, 
    nbreCoatationB: string, 
    nbreCoatationABP: string, 
    nbreCoatation: string, 
    cleCotation: string, 
    natureTransaction: string, 
    natureActe: string, 
    statut: number ,
    nomMedecin: string ,
    traitePar: string ,
    idPrestation: string
) {
    this.matriculeAdherent = matriculeAdherent
    this.numConsultation = numConsultation
    this.idAdherent = idAdherent
    this.contractant = contractant
    this.user = user
    this.idBeneficiare = idBeneficiare
    this.matriculeAdheren = matriculeAdheren
    this.dateVisite = dateVisite
    this.ticketModerateur = ticketModerateur
    this.mntRestePayer = mntRestePayer
    this.idTiers = idTiers
    this.totalOrdenance = totalOrdenance
    this.totalMedRemboursable = totalMedRemboursable
    this.totalMedNonRemboursable = totalMedNonRemboursable
    this.commentaire = commentaire
    this.dateConsultation = dateConsultation
    this.reference = reference
    this.idMedecin = idMedecin
    this.typePrestation = typePrestation
    this.id = id
    this.nid = nid
    this.nbreCoatationB = nbreCoatationB
    this.nbreCoatationABP = nbreCoatationABP
    this.nbreCoatation = nbreCoatation
    this.cleCotation = cleCotation
    this.natureTransaction = natureTransaction
    this.natureActe = natureActe
    this.statut = statut
    this.nomMedecin = nomMedecin
    this.traitePar = traitePar
    this.idPrestation = idPrestation
  }
 
  
}
