import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from 'devextreme/localization';
import DxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Observable, lastValueFrom, tap } from 'rxjs';
import Swal from 'sweetalert2';
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
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';


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
  selectedFile!: File;
  natureActe!:string
  idPrestation!:string
  ordonnace = {
   
    idAdherent:'',
    idBeneficiare:'',
    nomMedecin:"",
    idTiers: sessionStorage.getItem("matriculePs")!,
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
    idMedecin:sessionStorage.getItem("matriculePs")!,
    nid:'0',
    json:'',
    numPolice:'A70220033',
    nomBenef:'',
    qualite:"",
    numContrat:"",
    numConsultation:""
  };
  dataSource2: any;

  customersData: any;

  shippersData: any;

  refreshModes!: string[];

  refreshMode!: string;

  requests: string[] = [];

  ocrPopup=false

  url = 'http://localhost:8089/Stage/acte-optique';

  lookupData!: any[];
  lookupDataGD!: any[];
  lookupDataQte!: any[];
  lookupDataNature!: any[];

  selectedValue: any = null;
  selectedValueGD: any = null;
  selectedValueQte: any = null;
  selectedValueNature: any = null;

  
   matriculeAdherentSearch ="";
   numPoilceSearch!:string

  EcartBox: number = 0;
  natureBox: number = 0;
  typeBox: number = 0;
  colorBox: number = 0;
  traitementBox: number = 0;
  specialBox: number = 0;

  EcartBoxL: string = '';
  natureBoxL: string = '';
  typeBoxL: string = '';
  colorBoxL: string = '';
  traitementBoxL: string = '';
  specialBoxL: string = '';

          logs:number=0
          logc:number=0
          loga:number=0
          lods:number=0
          lodc:number=0
          loda:number=0
          pods:number=0
          podc:number=0
          poda:number=0
          pogs:number=0
          pogc:number=0
          poga:number=0
  ocrM: any;

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
    private tokenStorage:TokenStorageService,
    private toastr: ToastrService,
  ) {
    // isStillValide(this.loginService)
    if (!loginService.isAuthenticated()) {
      loginService.logOut();
    }
    this.role = this.tokenStorage.getUser().role;
   console.log(this.role)
    this.dataSource = this.service.getEmployees();
    this.states = this.service.getStates();
   

      this.historiqueAdherentCircuitMite=[]
      

      //
      this.refreshMode = 'full';
      this.refreshModes = ['full', 'reshape', 'repaint'];
  
   
  
      this.lookupData = [
        { id: 'Lentille de contact', name: 'Lentille de contact' },
        { id: 'Monture', name: 'Monture' },
        { id: 'Verre Optique', name: 'Verre Optique' },
        { id: 'Verre Varilux ', name: 'Verre Varilux' },
      ];
      this.selectedValue = '';
  
      //for OD/OG
      this.lookupDataGD = [
        { id: 'OD', name: 'OD' },
        { id: 'OG', name: 'OG' },
      ];
      this.selectedValueGD = '';
      //for Qte
      this.lookupDataQte = [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
      ];
      this.selectedValueQte = '';
      //nature
      this.lookupDataNature = [
        { id: 'De Loin', name: 'De Loin' },
        { id: 'De prés', name: 'De prés' },
        { id: 'Double Foyé', name: 'Double Foyé' },
      ];
      this.selectedValueNature = '';
  }

  recherche() {
  
   
    const myButton = document.getElementById('myButton');
    const myDiv = document.getElementById('myDiv');
    const myDiv1 = document.getElementById('myDiv1');
   const mat= this.matriculeAdherentSearch
   const numPo=this.numPoilceSearch
   var idA=""
    if(this.matriculeAdherentSearch==""){
      alert("Ecrivez un matricule svp")
      myDiv!.style.display = 'initial';
      myDiv1!.style.display = 'none';
      return
    }else{
      Swal.fire({
        title: 'Veuillez patienter',
  
       
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        
        },
       
      })
      window.sessionStorage.setItem("matricule",this.matriculeAdherentSearch)
      window.sessionStorage.setItem("numPolice",this.numPoilceSearch)
      this.profileService
      .getMemberProfileData(this.matriculeAdherentSearch, this.numPoilceSearch)
      .subscribe(async (res: any) => {
        try {
         Swal.hideLoading()
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
          idA= obj['roles'][0]['tiers']['id'];
          this.ordonnace.numContrat = obj['numContrat']
          this.benefData= obj['roles']
         this.ordonnace.idAdherent=this.idAdherant
         this.getAdherentHistorique(idA)
         this.benefData.forEach((el:any)=>{
            if(el!==null){
              this.listBenef.push({
                qualite:el["qualite"]['libelle'],
                idbenef:el['tiers']['id'],
                nom:el["personnePhysique"]['nomComplet'],
                
              })
            }
            

          })
          myDiv!.style.display = 'none';
          myDiv1!.style.display = 'initial';
          console.log(this.benefData)
        } catch (error) {
          console.log(error);
        }
      });
     
      
      Swal.hideLoading()
        console.log(this.matriculeAdherentSearch)
        this.dataSource2 = new CustomStore({
          key: 'id',
          //load
          load: async () => {
            try {
              const data = await this.sendRequest(this.url + '/getActesByMatricule/'+mat);
              return {
                data: data,
              };
            } catch (error) {
              console.error('Error loading data:', error);
              throw error;
            }
          },
          //delete
          remove: (key: string) =>
            this.sendRequest(this.url + '/deleteActe/' + key, 'DELETE', {
              key,
            }),
          //add
          insert: (values: { date: any; matriculeAdherent: any; qte: any; mntDepense: any; mntRevise: any; decompteRO: any; nature: any; OGOD: any; }) => {
          
    
            return this.sendRequest(this.url + '/add-acte', 'POST', {
              date: values.date,
              matriculeAdherent:mat,
              type: this.selectedValue,
              qte: this.selectedValueQte,
              mntDepense: values.mntDepense,
              mntRevise: values.mntRevise,
              decompteRO: values.decompteRO,
              logs:this.logs,
              logc:this.logc,
              loga:this.loga,
              lods:this.lods,
              lodc:this.lodc,
              loda:this.loda,
              pods:this.pods,
              podc:this.podc,
              poda:this.poda,
              pogs:this.pogs,
              pogc:this.pogc,
              poga:this.poga,
              nature: this.selectedValueNature,
              ogod: this.selectedValueGD,
              ecart:this.EcartBoxL,
              natureVerres:this.natureBoxL,
              typesVerres:this.typeBoxL,
              colorverres:this.colorBoxL,
              traitementVerres:this.traitementBoxL,
              verresSpec:this.specialBoxL,
             
            });
          },
          //update
          update: (key: string, values: { date: any; matriculeAdherent: any; mntDepense: any; mntRevise: any; decompteRO: any; }) =>
            this.sendRequest(this.url + '/updateActe/' + key, 'PUT', {
              date: values.date,
              matriculeAdherent: values.matriculeAdherent,
              type: this.selectedValue,
              qte: this.selectedValueQte,
              mntDepense: values.mntDepense,
              mntRevise: values.mntRevise,
              decompteRO: values.decompteRO,
              nature: this.selectedValueNature,
              ogod: this.selectedValueGD,
              ecart:this.EcartBoxL,
              natureVerres:this.natureBoxL,
              typesVerres:this.typeBoxL,
              colorverres:this.colorBoxL,
              traitementVerres:this.traitementBoxL,
              verresSpec:this.specialBoxL
            }),
        });
      
    }
    this.numPoilceSearch=""
    this.matriculeAdherentSearch=""
   
  }

  ngOnInit(): void {
    const myButton = document.getElementById('myButton');
    const myDiv = document.getElementById('myDiv');
    const myDiv1 = document.getElementById('myDiv1');

    //this.getHistorique();
/*
    myDiv1!.style.display = 'none';
    if (myButton && myDiv) {
      myButton.addEventListener('click', () => {
        console.log('clicked');
        myDiv.style.display = 'none';
        myDiv1!.style.display = 'initial';
      });
    }*/
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
    console.log(this.numPoilceSearch)
    // calculer MntRemboursementPs , get mnt ticket mod , mnt reste payer
    if (this.addOrdonnancePharDialogForm.valid) {
      this.loading = true;
      // get id ps
      this.ajoutActeService
        .getPrestationsPsByIdTierPSData(sessionStorage.getItem("matriculePs")!, sessionStorage.getItem("numPolice")!)
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
                    this.ordonnace.idPrestation=idPrestation
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
    Swal.fire({
      title: 'Veuillez patienter',

     
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      
      },
     
    })
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
      sessionStorage.getItem("numPolice")!,"wael",this.ordonnace.idBeneficiare,sessionStorage.getItem("matricule")!,this.ordonnace.dateVisite,this.ordonnace.ticketModerateur,this.ordonnace.mntRestePayer,
      this.ordonnace.idTiers,this.ordonnace.totalOrdanance,this.ordonnace.totalMedRemb,this.ordonnace.totalMedNonRemb,CHAINE_VIDE,this.ordonnace.dateVisite,
      this.ordonnace.reference,this.ordonnace.idMedecin,"Pharmacie",CHAINE_VIDE,"0",CHAINE_VIDE,CHAINE_VIDE,"0","D","CONS",CHAINE_VIDE,1,this.ordonnace.nomMedecin,
      "wael",this.ordonnace.idPrestation)

      this.http.post("http://localhost:8089/Stage/acte/createLigneFactureTemporaire",jsonData,{responseType:'text'}).subscribe(res=>{
        console.log("facture temp cree")
        Swal.hideLoading()
      },err=>{
        Swal.hideLoading()
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
  getAdherentHistorique(em:string){
    this.historiqueAdherentService.getFactureBordereauByIdAdherent(em,sessionStorage.getItem("matriculePs")!,0,200).subscribe(dataFactBordAdherent=>{
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
  logRequest(method: string, url: string | any[], data: { [x: string]: any }) {
    const args = data
      ? Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join(' ')
      : '';

    const time = formatDate(new Date(), 'HH:mm:ss');

    this.requests.unshift(`${time} ${method} ${url.slice(URL.length)} ${args}`);
  }

  sendRequest(url: string, method = 'GET', data: any = {}): Promise<any> {
    this.logRequest(method, url, data);

    const httpParams = new HttpParams({ fromObject: data });
    const httpOptions = { withCredentials: false, body: httpParams };
    let result: Observable<any>;
    const params: { id: number } = {
      id: data,
    };

    const options: { params: { [param: string]: number } } = {
      params: {
        id: params.id,
      },
    };

    let httpOptions2: any;

    if (method === 'GET') {
      result = this.http.get(url);
      console
    } else if (method === 'PUT') {
      httpOptions2 = data;
      console.log(data);
      result = this.http.put(url, httpOptions2);
    } else if (method === 'POST') {
      httpOptions2 = data;
      console.log(data);
      console.log(this.lookupData);
      result = this.http.post(url, httpOptions2);

      result = result.pipe(
        tap(() => {
          if (method === 'POST') {
            this.selectedValue = null; // Clear the selected value only for POST request
          }
        })
      );
    } else if (method === 'DELETE') {
      httpOptions2 = { body: data };
      result = this.http.delete(url, httpOptions);
    }

    return lastValueFrom(result!)
      .then((data: any) => (method === 'GET' ? data : data))
      .catch((e) => {
        throw e?.error?.message;
      });
  }
  isODOGHidden() {
    if (this.selectedValue == 'Monture' || this.selectedValueQte == 2) {
      return true;
    } else return false;
  }
  isNatureHidden() {
    if (
      this.selectedValue == 'Monture' ||
      this.selectedValue == 'Lentille de contact'
    ) {
      return true;
    }

    return false;
  }
  
  isQteHidden() {
    if (this.selectedValue == 'Monture') {
      return true;
    }
    return false;
  }
  isPresGVIsible(){
    if((this.selectedValueGD=="OG" || this.selectedValueQte==2) && this.selectedValueNature =="De prés"){
      return true;
    }
    if(this.selectedValueQte==2 && this.selectedValueNature =="Double Foyé" ){
      return true
    }
    return false;
  }
  isPresDVisible(){
    if((this.selectedValueGD=="OD" || this.selectedValueQte==2) && this.selectedValueNature =="De prés"){
      return true;
    }
    if(this.selectedValueQte==2 && this.selectedValueNature =="Double Foyé" ){
      return true
    }
    return false;
  }
  isLoinGHidden(){
    if((this.selectedValueGD=="OG"|| this.selectedValueQte==2) && this.selectedValueNature =="De Loin"){
      return true
    }
    if(this.selectedValueQte==2 && this.selectedValueNature =="Double Foyé" ){
      return true
    }
    return false
  }
  isLoinDHidden(){
    if((this.selectedValueGD=="OD" || this.selectedValueQte==2) && this.selectedValueNature =="De Loin"){
      return true
    }
    if(this.selectedValueQte==2 && this.selectedValueNature =="Double Foyé" ){
      return true
    }
    return false
  }
  onPopupHiding() {
    console.log('canceled');
    this.selectedValue = '';
    this.selectedValueGD = '';
    this.selectedValueNature = '';
    this.selectedValueQte = '';
  }

  checkboxChanged(checkboxValue: number) {
    this.EcartBox = this.EcartBox === checkboxValue ? 0 : checkboxValue;
    switch (this.EcartBox) {
      case 1:
        this.EcartBoxL = 'Binoculaire';
        break;
      case 2:
        this.EcartBoxL = 'Monoculaire';
        break
      default:
        
        break;
    }
  }
  natureboxChanged(checkboxValue: number) {
    this.natureBox = this.natureBox === checkboxValue ? 0 : checkboxValue;
    switch (this.natureBox) {
      case 1:
        this.natureBoxL = 'Minéral';
        break;
      case 2:
        this.natureBoxL = 'Organique';
        break;
      default:
       
        break;
    }
  }
  typeboxChanged(checkboxValue: number) {
    this.typeBox = this.typeBox === checkboxValue ? 0 : checkboxValue;
    switch (this.typeBox) {
      case 1:
        this.typeBoxL = 'Simple';
        break;
      case 2:
        this.typeBoxL = 'Bifocaux';
        break;
      case 3:
        this.typeBoxL = 'Demi-lune';
        break;
      case 4:
        this.typeBoxL = 'Varilux';
        break;

      default:
        
        break;
    }
  }
  colorboxChanged(checkboxValue: number) {
    this.colorBox = this.colorBox === checkboxValue ? 0 : checkboxValue;
    switch (this.colorBox) {
      case 1:
        this.colorBoxL = 'Teinté';
        break;
      case 2:
        this.colorBoxL = 'Photochromique';
        break;
      case 3:
        this.colorBoxL = 'Blanc';
        break;

      default:
        
        break;
    }
  }
  traitboxChanged(checkboxValue: number) {
    this.traitementBox =
      this.traitementBox === checkboxValue ? 0 : checkboxValue;
    switch (this.traitementBox) {
      case 1:
        this.traitementBoxL = 'U.V & X';
        break;
      case 2:
        this.traitementBoxL = 'Anti griffe';
        break;
      default:
        
        break;
    }
  }

  specialboxChanged(checkboxValue: number) {
    this.specialBox = this.specialBox === checkboxValue ? 0 : checkboxValue;
    switch (this.specialBox) {
      case 1:
        this.specialBoxL = 'Sphero';
        break;
      case 2:
        this.specialBoxL = 'Omega';
        break;
      case 3:
        this.specialBoxL = 'Hypéral';
        break;
        case 4:
          this.specialBoxL = 'Precal';
          break;  
      default:
        
        break;
    }
  }
  clearRequests() {
    this.requests = [];
  }
 
  OcrPopupVisivle(){
    this.ocrPopup=true
    this.addOrdonnancePharDialogForm.controls['totalOrdonnance'].setValue("")
    this.addOrdonnancePharDialogForm.controls['totalMedNonRemboursable'].setValue("")
    this.addOrdonnancePharDialogForm.controls['totalMedRemboursable'].setValue("")

  }
  OcrPopupHidden(){
    this.ocrPopup=false
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post("http://localhost:8050/Ocr", formData, {responseType: 'text'}).subscribe(
        (response:any) => {
          // File uploade'd successfully
          this.toastr.success('Succees!', '', {
            timeOut: 2500,
          });
          console.log('File uploaded:', response);
          this.addOrdonnancePharDialogForm.controls['totalOrdonnance'].setValue(response)
          this.addOrdonnancePharDialogForm.controls['totalMedRemboursable'].setValue(response)
          this.addOrdonnancePharDialogForm.controls['totalMedNonRemboursable'].setValue("0")
          this.ocrM =response
        },
        error => {
          // Handle error
          this.toastr.error('error!', '', {
            timeOut: 2500,
          });
          console.error('Error uploading file:', error);
        }
      );
    }
  }
  
}
