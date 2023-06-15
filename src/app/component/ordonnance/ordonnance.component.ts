import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import DxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';

import { lastValueFrom } from 'rxjs';
import {
  Employee,
  ServiceFetchDATA,
  State,
} from 'src/app/services/service.service';
import { ProfileService } from 'src/app/helper/profile.service';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { isStillValide } from 'src/app/helper/Validation';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { BordereauByIdTierParams } from 'src/app/models/bordereau/bordereau-by-id-tier-params.model';
import { CHAINE_VIDE } from 'src/app.constants';
import { HistoriqueActeService } from 'src/app/services/historique-acte/historique-acte.service';
import { HistoriqueActe } from 'src/app/models/bordereau/historique-acte.model';
import { HistoriqueService } from 'src/app/services/historique-acte/historique/historique-service.service';
import { Benef } from 'src/app/models/beneficiace/benef';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjoutActeService } from 'src/app/services/ajout-acte-service';
import { PipeService } from 'src/app/helper/pipe-service';
import { LigneFacture } from 'src/app/models/ligne-facture.model';
import { HistoriqueActeCircuitMixteService } from 'src/app/services/historiqueActeMixte/historique-acte-circuit-mixte-service';
import { HistoriqueAdherentService } from 'src/app/services/historiqueAdherent/historique-adherent-service';
import { ConsultationHistoriqueActeMixte } from 'src/app/models/Consultation/consultation-historique-acte-mixte.model';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
})
export class OrdonnanceComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  dataSource!: Employee[];

  states!: State[];

  startEditAction = 'click';

  selectTextOnEditStart = true;

  displayMode = 'full';

  showPageSizeSelector = true;

  showInfo = true;

  collapsed = false;

  showNavButtons = true;
  readonly allowedPageSizes = [5, 10, 'all'];
  paramsBord = new BordereauByIdTierParams();

  adherent!: string;
  sexe!: string;
  dateDeNaissance!: string;
  numCin!: string;
  paysDeNaissance!: string;
  villeDeNaissance!: string;
  listHistorique: HistoriqueActe[] = [];
  listHistoriquefiltre: HistoriqueActe[] = [];
  popupScrollViewVisible: boolean = false;


  listBenef: Benef[] = [];
  selectedRow!: ConsultationHistoriqueActeMixte[];

  addOrdonnancePharDialogForm!: FormGroup;
  loading!: boolean;
  idPs: any;
  sousPlafond!: number;
  idAdherant!: string;
  //confirm
  codeFamille:string= CHAINE_VIDE
  codeSpec:string=CHAINE_VIDE
  dateVisteFormat!:string
  jsonHistorique=[]
  historiqueAdherentCircuitMite:Array<LigneFacture>
  historiqueAdherent:ConsultationHistoriqueActeMixte[]=[]
  dataNgx:any
  benefData:Benef[]=[]
  role=""
  //ajout facture
  numPolice!:string
  idBeneficiare!:string
  idAdherent!:string
  matriculeAdherent!:string
  dateVisite!:string
  ticketModerateur!:string
  mntRestePayer!:string
  idTiers!:string
  nid!:string
  json!:string
  idMedecin!:string
  reference!:string
  natureActe!:string
  idPrestation!:string
  ordonnace = {
   
    idAdherent:'',
    idBeneficiare:'',
    nomMedecin:"",
    idTiers: '4462',
    dateVisite:'',
    totalMedRemb:'',
    totalMedNonRemb:'',
    totalOrdanance:'',
    ticketModerateur: '',
    mntRestePayer: CHAINE_VIDE,
    matriculeAdherent: '00655',
    nomAssure:"",
    idPrestation: "",
    natureActe:'',
    reference:'0',
    idMedecin:'4462',
    nid:'0',
    json:'',
    numPolice:'A70220033',
    nomBenef:'',
    qualite:"",
    numContrat:"",
    numConsultation:""
  };
  constructor(
    private router: Router,
    private service: ServiceFetchDATA,
    private profileService: ProfileService,
    private xmlToJson: XMLTOJSON,
    private loginService: LoginPharmacienService,
    private historiqueActeService: HistoriqueActeService,
    private historiqueService: HistoriqueService,
    private formBuilder: FormBuilder,
    private ajoutActeService: AjoutActeService,
    private http:HttpClient,
    private historiqueActeMixtetService:HistoriqueActeCircuitMixteService,
    private  historiqueAdherentService:HistoriqueAdherentService,
    private tokenStorage:TokenStorageService
  ) {
    // isStillValide(this.loginService)
    if (!loginService.isAuthenticated()) {
      loginService.logOut();
    }
    this.role = this.tokenStorage.getUser().role;
   
    this.dataSource = this.service.getEmployees();
    this.states = this.service.getStates();
    this.profileService
      .getMemberProfileData('00655', 'A70220033')
      .subscribe(async (res: any) => {
        try {
          const jsonResult = this.xmlToJson.xmlToJson(res);
          console.log(jsonResult);
          const obj =
            jsonResult['Envelope']['Body'][
              'getContratAdherentByMatriculeResponse'
            ]['return'];
          console.log(obj);
          this.adherent = obj['personnePhysique']['nomComplet'];
          this.sexe = obj['personnePhysique']['sexe']['libelle'];
          this.dateDeNaissance = obj['personnePhysique']['dateNaissance'];
          this.numCin = obj['personnePhysique']['numeroPieceId'];
          this.villeDeNaissance = obj['personnePhysique']['gouvNaissance'];
          this.idAdherant = obj['roles'][0]['tiers']['id'];
          this.ordonnace.numContrat = obj['numContrat']
          this.benefData= obj['roles']
         this.ordonnace.idAdherent=this.idAdherant
         this.benefData.forEach((el:any)=>{
            if(el!==null){
              this.listBenef.push({
                qualite:el["qualite"]['libelle'],
                idbenef:el['tiers']['id'],
                nom:el["personnePhysique"]['nomComplet'],
                
              })
            }
            

          })
          console.log(this.benefData)
        } catch (error) {
          console.log(error);
        }
      });

      this.historiqueAdherentCircuitMite=[]
      this.getAdherentHistorique()
  }

  recherche() {
    const myButton = document.getElementById('myButton');
    const myDiv = document.getElementById('myDiv');
    const myDiv1 = document.getElementById('myDiv1');
    myDiv!.style.display = 'none';
    myDiv1!.style.display = 'initial';
  }

  ngOnInit(): void {
    const myButton = document.getElementById('myButton');
    const myDiv = document.getElementById('myDiv');
    const myDiv1 = document.getElementById('myDiv1');

    //this.getHistorique();

    myDiv1!.style.display = 'none';
    if (myButton && myDiv) {
      myButton.addEventListener('click', () => {
        console.log('clicked');
        myDiv.style.display = 'none';
        myDiv1!.style.display = 'initial';
      });
    }
    //off canvas
    const canvas = document.getElementById('offcanvasBoth');
    canvas!.style.visibility = 'block';

    const toggleButton = document.getElementById('toggleButton');
    toggleButton?.addEventListener('click', () => {
      if (canvas!.style.display === 'hidden') {
        console.log('clickedd');
        canvas!.style.display = 'initial';
      } else {
        canvas!.style.display = 'hidden';
      }
    });
    //form
    // form
    this.addOrdonnancePharDialogForm = this.formBuilder.group({
      totalMedRemboursable: [CHAINE_VIDE, [Validators.required]],
      totalMedNonRemboursable: [CHAINE_VIDE, [Validators.required]],
      totalOrdonnance: [{ value: CHAINE_VIDE, disabled: true }, []],
    });
  }
  reload() {
    window.location.reload();
  }
  click() {
    alert('checked');
  }
  Ordonance() {
    this.router.navigate(['ordonnance'], { replaceUrl: false });
  }
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  goToConjoints() {
    this.router.navigate(['Conjoints'], { replaceUrl: false });
  }
  //content ready
  contentReady = (e: {
    component: { expandRow: (arg0: string[]) => void };
  }) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  //get historique de x
  getHistorique() {
    // appel au service
    this.paramsBord.idTiers = '4462';
    this.paramsBord.nature = CHAINE_VIDE;
    this.paramsBord.dateDeb = CHAINE_VIDE;
    this.paramsBord.dateFin = CHAINE_VIDE;
    this.paramsBord.numPolice = 'A70220033';
    this.paramsBord.refFact = CHAINE_VIDE;
    this.paramsBord.pagesize = 10;
    this.paramsBord.type = CHAINE_VIDE;
    this.paramsBord.page = 0;

    const params: BordereauByIdTierParams = {
      idTiers: '4462',
      nature: '',
      dateDeb: '',
      dateFin: '',
      numPolice: 'A70220033',
      refFact: '',
      pagesize: 100,
      type: '',
      page: 0,
      natureDent: '',
      filtre: '',
      columnSort: '',
      sortDir: '',
    };

    console.log('params' + this.paramsBord);
    // last CHAINE VIDE : this.typeFacture
    this.historiqueActeService.getFactureBordereauByIdTier(params).subscribe(
      (data) => {
        const jsonObjfact = this.xmlToJson.xmlToJson(data);
        // this.AddToTableHistorique(jsonObjfact); // historique
        this.listHistorique =
          this.historiqueService.createElementHistorique(jsonObjfact);

        this.listHistoriquefiltre = this.listHistorique.filter(
          (p) => p.matriculeAssure == '00655'
        );

        console.log(this.listHistoriquefiltre);
        /*
        this.listBenef = this.listHistoriquefiltre.reduce(
          (beneficiaries: Benef[], acte) => {
            const existingBeneficiary = beneficiaries.find(
              (b) => b.nom === acte.nombeneficiaire
            );
            if (!existingBeneficiary) {
              beneficiaries.push({
                nom: acte.nombeneficiaire,
                qualite: acte.qualite,
                idbenef:""
              });
            }
            return beneficiaries;
          },
          []
        );
        **/
       // console.log(this.listBenef);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  //on row db click
  onRowDoubleClick() {
    this.popupScrollViewVisible = true;
  }
  selectionChanged(e: {
    currentSelectedRowKeys: any;
    currentDeselectedRowKeys: any;
    selectedRowKeys: any;
    selectedRowsData: any;
  }) {
    this.selectedRow = e.selectedRowKeys;
    this.ordonnace.dateVisite=this.selectedRow[0].date
    this.ordonnace.nomBenef=this.selectedRow[0].nomBenef
    this.ordonnace.nomAssure=this.selectedRow[0].nomAssure
    this.ordonnace.nomMedecin=this.selectedRow[0].medecin
    this.ordonnace.numConsultation=this.selectedRow[0].numTrans
     const beneficiary = this.listBenef.find((el) => el.nom === this.ordonnace.nomBenef);
     console.log(beneficiary)
      if (beneficiary) {
        this.ordonnace.idBeneficiare = beneficiary.idbenef;
        this.ordonnace.qualite = beneficiary.qualite
     
      }
    
  
    
    console.log("new element = "+this.ordonnace.idBeneficiare+" "+this.ordonnace.qualite)
  }
  //close montant popup
  CloseMontantPopup() {
    this.popupScrollViewVisible = false;
  }
  //calculer mntRemb//tikt moder

  calculer(): void {
    // calculer MntRemboursementPs , get mnt ticket mod , mnt reste payer
    if (this.addOrdonnancePharDialogForm.valid) {
      this.loading = true;
      // get id ps
      this.ajoutActeService
        .getPrestationsPsByIdTierPSData('4462', 'A70220033')
        .subscribe((data) => {
          const jsonPrestationsPsByIdTierPS = this.xmlToJson.xmlToJson(data);
          if (jsonPrestationsPsByIdTierPS != null) {
            const idPrestation =
              jsonPrestationsPsByIdTierPS['Envelope']['Body'][
                'getPrestationsPsByIdTierPSResponse'
              ]['return'][0]['id'];
            console.log(idPrestation);
            if (idPrestation != null) {
              this.ordonnace.totalMedRemb =
                this.addOrdonnancePharDialogForm.value.totalMedRemboursable;
              this.ordonnace.totalMedNonRemb = 
                this.addOrdonnancePharDialogForm.value.totalMedNonRemboursable;
              // back office requirment
              const obj =
                '{"extranetWsInputDto":[{"idPrestationPs":"' +
                idPrestation +
                '","totalMedicamentRemb":"' +
                this.ordonnace.totalMedRemb +
                '","totalMedicamentNonRemb":"' +
                this.ordonnace.totalMedNonRemb +
                '","nbrCotation":"0"}]}';
              this.ajoutActeService.getMntRemboursementPs(obj).subscribe(
                (dataRemb) => {
                  const jsonMntRemboursementPs =
                    this.xmlToJson.xmlToJson(dataRemb);
                  console.log('JSON RETURN >>>', jsonMntRemboursementPs);
                  if (
                    jsonMntRemboursementPs != null &&
                    !jsonMntRemboursementPs['Envelope']['Body']['Fault']
                  ) {
                    const jsonMntRemb =
                      jsonMntRemboursementPs['Envelope']['Body'][
                        'getMntRemboursementPsResponse'
                      ]['return'];
                    this.ordonnace['totalOrdanance'] =
                      jsonMntRemb['mntTotalOrdonnace'];
                    this.ordonnace['ticketModerateur'] =
                      jsonMntRemb['mntTicketModerateur'];
                    this.ordonnace['mntRestePayer'] =
                      jsonMntRemb['mntRestePayer'];
                    this.idPs = this.ordonnace.idTiers;
                    this.ajoutActeService
                      .getMontantDisponibleByBenef(
                        '00655',
                        this.idAdherant,
                        this.idPs,
                        
                        idPrestation,

                      )
                      .subscribe(
                        (resp) => {
                          const jsonObjResp = this.xmlToJson.xmlToJson(resp);
                          this.sousPlafond = parseFloat(
                            jsonObjResp['Envelope']['Body'][
                              'getMontantDisponibleByBenefResponse'
                            ]['return']
                          );
                          if (
                            parseFloat(jsonMntRemb['mntRestePayer']) >
                            this.sousPlafond
                          ) {
                            const mntRestePayer = this.sousPlafond;
                            const ticketModerateur =
                              parseFloat(this.ordonnace['totalOrdanance']) -this.sousPlafond;
                            this.ordonnace['ticketModerateur'] =
                                                                ticketModerateur.toFixed(2);
                            this.ordonnace['mntRestePayer'] =
                                                               mntRestePayer.toFixed(2);
                            jsonMntRemb['mntTicketModerateur'] =
                                                               ticketModerateur.toFixed(2);
                            jsonMntRemb['mntRestePayer'] =
                                                                 mntRestePayer.toFixed(2);
                            console.log(this.ordonnace);
                          }
                          this.loading = false;
                          this.addOrdonnancePharDialogForm.controls[
                            'totalOrdonnance'
                          ].setValue(jsonMntRemb['mntTotalOrdonnace']);
                        },
                        (err) => {
                          console.error(err);
                          this.loading = false;
                        }
                      );
                  }
                },
                (err) => {
                  console.error(err);
                }
              );
              this.ordonnace.idPrestation = idPrestation;
            }
          }
        });
    }
  }
  //confirm ordonnance
  onSubmited(){
    const date_ob = new Date();

    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();
    this.dateVisteFormat = year + '-' + month + '-' + date;
    /*
    this.http.get('helper/objects.json').subscribe((data: any) => {
      this.codeSpec = data['codeSpec'][1]
    });
     **/
    const jsonData= new LigneFacture(this.ordonnace.matriculeAdherent,this.ordonnace.numConsultation,this.ordonnace.idAdherent,
      this.ordonnace.numPolice,"wael",this.ordonnace.idBeneficiare,this.ordonnace.matriculeAdherent,this.ordonnace.dateVisite,this.ordonnace.ticketModerateur,this.ordonnace.mntRestePayer,
      this.ordonnace.idTiers,this.ordonnace.totalOrdanance,this.ordonnace.totalMedRemb,this.ordonnace.totalMedNonRemb,CHAINE_VIDE,this.ordonnace.dateVisite,
      this.ordonnace.reference,this.ordonnace.idMedecin,"Pharmacie",CHAINE_VIDE,"0",CHAINE_VIDE,CHAINE_VIDE,"0","D","CONS",CHAINE_VIDE,1,this.ordonnace.nomMedecin,
      "wael",this.ordonnace.idPrestation)

      this.http.post("http://localhost:8089/Stage/acte/createLigneFactureTemporaire",jsonData,{responseType:'text'}).subscribe(res=>{
        console.log("facture temp cree")
      },err=>{
        console.error(err)
      })
  
   /*
    this.ajoutActeService.createLigneFactureTemp(this.ordonnace.numPolice,this.ordonnace.idBeneficiare,
      this.ordonnace.idAdherent,this.ordonnace.matriculeAdherent,this.ordonnace.dateVisite,
      this.ordonnace.ticketModerateur,this.ordonnace.mntRestePayer,this.ordonnace.idTiers,
      this.ordonnace.nid,this.ordonnace.json,this.ordonnace.idMedecin,this.ordonnace.reference,
      this.ordonnace.natureActe,this.ordonnace.idPrestation).subscribe(res=>{
        if(res){
          console.log("ligne facture crée")
        }
      },err=>{
        console.log(err);
      })
   **/
  }
  //get adherent historique
  getAdherentHistorique(){
    this.historiqueAdherentService.getFactureBordereauByIdAdherent("104088","4462",0,200).subscribe(dataFactBordAdherent=>{
      const jsonHistorique = this.xmlToJson.xmlToJson(dataFactBordAdherent)
     
      
       
      this.historiqueAdherent=this.historiqueActeMixtetService.addToTable(jsonHistorique)
      console.log(this.historiqueAdherent)
      /*
      this.listBenef = this.historiqueAdherent.reduce(
        (beneficiaries: Benef[], acte) => {
          const existingBeneficiary = beneficiaries.find(
            (b) => b.nom === acte.nomBenef
          );
          if (!existingBeneficiary) {
            beneficiaries.push({
              nom: acte.nomBenef,
              qualite: acte.qualite,
            });
          }
          return beneficiaries;
        },
        []
      );
      **/
        
     

    })

  }

  //fin
}
