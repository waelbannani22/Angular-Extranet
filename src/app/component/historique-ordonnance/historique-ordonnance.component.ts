import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CHAINE_VIDE } from 'src/app.constants';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { BordereauByIdTierParams } from 'src/app/models/bordereau/bordereau-by-id-tier-params.model';
import { HistoriqueActe } from 'src/app/models/bordereau/historique-acte.model';
import { Country, dataset } from 'src/app/models/country/country.module';
import { HistoriqueActeNonFacture } from 'src/app/models/Historique/historique-acte-non-facture.model';
import { GenererBordereau } from 'src/app/models/NonFacturees/generer-bbordereau.model';
import { BordereauFactureService } from 'src/app/services/historique-acte/bordereau-facture/bordereau-facture-service.service';
import { HistoriqueActeService } from 'src/app/services/historique-acte/historique-acte.service';
import { HistoriqueService } from 'src/app/services/historique-acte/historique/historique-service.service';
import { NonFactureesGeneriqueService } from 'src/app/services/historique-acte/non-facturees/non-facturees-generique-service.service';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../../helper/sortable-header.directive';
import themes from 'devextreme/ui/themes';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-historique-ordonnance',
  templateUrl: './historique-ordonnance.component.html',
  styleUrls: ['./historique-ordonnance.component.css'],
  preserveWhitespaces: true,
})
export class HistoriqueOrdonnanceComponent implements OnInit {
  isShowDivIf = true;
  dataSourceConsultationHistory: any;
  NonfactureListeSelectionees:HistoriqueActeNonFacture[]=[]
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  startDate!: Date;
  endDate!: Date;
  data: Array<Country> = dataset;
  countries: Array<Country> = dataset;
  filter: string = '';
  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective> | undefined;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  p: number = 1;

  selectedItems: any[] = [];
  listHistorique: HistoriqueActe[] = [];
  listNonFacture: HistoriqueActeNonFacture[] = [];
  paramsBord = new BordereauByIdTierParams();
  collapsed = false;
  scrollingConfig: any;
  allMode!: string;
  selectedDate!: Date |number|string ; // Set the initial selected date
  checkBoxesMode!: string;

  //non facturee
  dateFacture!: string;
  gBOrdereauForm!: FormGroup;
  NbPresFact!: number;
  gBordereau: GenererBordereau = new GenererBordereau();
  nom!: string;
  error = CHAINE_VIDE;
  loading = false;
  nbPrest!: number;
  dataIdFactBord:Array<string>=[]
  montantFacture:number=0;
  idFactBord:string=""

  /*
  startDatee = new Date('2022-04-01');
  endDatee = new Date('2022-12-31');
**/

  constructor(
    private historiqueService: HistoriqueService,
    private historiqueActeService: HistoriqueActeService,
    private router: Router,
    private xmlToJson: XMLTOJSON,
    private NonfactureService: NonFactureesGeneriqueService,
    private bordereauFactureService: BordereauFactureService,
    private loginService: LoginPharmacienService,
    private formBuilder: FormBuilder
  ) {
    if (!loginService.isAuthenticated()) {
      loginService.logOut();
    }
    this.scrollingConfig = { mode: 'horizontal' };
    this.getHistorique();

    this.allMode = 'allPages';
    this.checkBoxesMode = 'always';
  }

  filterList() {
    console.log(new Date(this.startDate));
    console.log(this.endDate);
    this.countries = this.data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= new Date(this.startDate) &&
        itemDate <= new Date(this.endDate)
      );
    });
    console.log(this.countries);
  }
  contentReady = (e: {
    component: { expandRow: (arg0: string[]) => void };
  }) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  isSelected(item: any): boolean {
    return this.selectedItems.indexOf(item) !== -1;
  }
  onSelectItem(event: any, item: any) {
    if (event.target.checked) {
      this.selectedItems.push(item);
    } else {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }
  onSubmit() {
    console.log(this.selectedItems);
  }
  // historique
  getHistorique() {
    // appel au service
    this.paramsBord.idTiers = '4462';
    this.paramsBord.nature = CHAINE_VIDE;
    this.paramsBord.dateDeb = CHAINE_VIDE;
    this.paramsBord.dateFin = CHAINE_VIDE;
    this.paramsBord.numPolice = 'A70220033';
    this.paramsBord.refFact = CHAINE_VIDE;
    this.paramsBord.pagesize = 200;
    this.paramsBord.type = CHAINE_VIDE;
    this.paramsBord.page = 0;

    const params: BordereauByIdTierParams = {
      idTiers: '4462',
      nature: '',
      dateDeb: '',
      dateFin: '',
      numPolice: 'A70220033',
      refFact: '',
      pagesize: 200,
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
        console.log(
          this.listHistorique.filter((p) => p.matriculeAssure == '00655')
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.gBOrdereauForm = this.formBuilder.group({
      contractant: [{ value: this.nom, disabled: true }],
      nbPresfact: [{ value: this.nbPrest, disabled: true }],
      dateFacture: [{ value: this.dateFacture, disabled: true }],
      numFacture: [
        this.gBordereau.numFacture,
        [
          Validators.required,
          // Validators.pattern(/^[0-9]+$/),
          Validators.pattern(/^[a-zA-Z0-9'-'\s]+$/),
        ],
      ],
      commentaire: [this.gBordereau.commentaire, []],
    });
  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers!.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.countries = this.data;
    } else {
      this.countries = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  //create facture
  CreateFacture() {
    console.log('inside on create');
    const date_ob = new Date();

    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();
    this.dateFacture = year + '-' + month + '-' + date;
    // n'est pas un kiné
    this.loading = true;
    let commentaire = CHAINE_VIDE;
   
    
    if (this.gBOrdereauForm.value.commentaire != null) {
      commentaire = this.gBOrdereauForm.value.commentaire;
    }
   
      //console.log("montant facture"+this.montantFacture +"idfactbord:"+idFactBord)
      this.historiqueActeService
      .createFacture('4462', this.montantFacture, '', '2022-10-29', 'test', this.idFactBord, 'A70220033')
      .subscribe(
        (data) => {
          const jsonObj = this.xmlToJson.xmlToJson(data);
          if (
            jsonObj['Envelope']['Body']['createFactureResponse'] &&
            jsonObj['Envelope']['Body']['createFactureResponse']['return']
          ) {
            console.log('facture created successufully');
          } else {
            this.error = '500';
          }
          this.loading = false; // Wait until get response
        },
        (err) => {
          this.error = '500';
          console.error(err);
          this.loading = false;
        }
      );
    
 
  }
  // non facturées
  getNonFacture(): void {
    //this.edited = false;
    // appel au service
    const params1: BordereauByIdTierParams = {
      idTiers: '4462',
      nature: '',
      dateDeb: '',
      dateFin: '',
      numPolice: 'A70220033',
      refFact: '',
      pagesize: 99,
      type: '0',
      page: 0,
      natureDent: '',
      filtre: '',
      columnSort: '',
      sortDir: '',
    };
    // this.historiqueData['typeFacture'] à verifier
    this.dataGrid.instance.beginCustomLoading("Patientez svp");
    this.historiqueActeService.getFactureBordereauByIdTier(params1).subscribe(
      (data) => {
        const jsonObjfact = this.xmlToJson.xmlToJson(data);
        if (jsonObjfact != null) {
          this.listNonFacture = jsonObjfact;
          this.dataGrid.instance.endCustomLoading();
        }
        this.dataGrid.instance.endCustomLoading();

      },
      (err) => {
        console.error(err);
        this.dataGrid.instance.endCustomLoading();
      }
    );
  }
  triggerSelectionChange() {
  
    try {
      const grid = document.getElementById('gridContainerNonFacture') as any;
      const selectedRowKeys = grid.option('selectedRowKeys');
      console.log(selectedRowKeys);
    } catch (error) {
      console.error(error)
    }
   
  }

 

  getSelectedRowKeys () {
    return this.dataGrid.instance.getSelectedRowKeys();
}
getSelectedRowsData () {
    return this.dataGrid.instance.getSelectedRowsData();
}
onSelectionChanged (e: { currentSelectedRowKeys: any; currentDeselectedRowKeys: any; selectedRowKeys: any; selectedRowsData: any; }) { // Handler of the "selectionChanged" event
  const currentSelectedRowKeys = e.currentSelectedRowKeys;
  const currentDeselectedRowKeys = e.currentDeselectedRowKeys;
  const allSelectedRowKeys = e.selectedRowKeys;
  const allSelectedRowsData = e.selectedRowsData;
  //data of list facture
  this.dataIdFactBord=[]
  this.NonfactureListeSelectionees=e.selectedRowsData
   //nb de facture
   this.NbPresFact=this.NonfactureListeSelectionees.length
   //calcul de montant totale
   this.montantFacture=0
   if(this.NonfactureListeSelectionees.length>0){
    for(const key in this.NonfactureListeSelectionees){
      if(this.NonfactureListeSelectionees.hasOwnProperty(key)){
        if(this.NonfactureListeSelectionees[key]===undefined){
          this.NbPresFact--;
        }
        if(this.NonfactureListeSelectionees[key]!==undefined){
          this.montantFacture += parseFloat(String(this.NonfactureListeSelectionees[key]['restePayer']));
          const jsonidFactBord= '{ "idFactBord": " '+this.NonfactureListeSelectionees[key]['id']+'"}'
          this.dataIdFactBord.push(jsonidFactBord)
        }
      }
    }
  }
     this.idFactBord= '{"listeFact":['+this.dataIdFactBord +']}'

 console.log(this.NonfactureListeSelectionees)
}
}
