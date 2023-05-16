import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CHAINE_VIDE } from 'src/app.constants';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { BordereauByIdTierParams } from 'src/app/models/bordereau/bordereau-by-id-tier-params.model';
import { HistoriqueActe } from 'src/app/models/bordereau/historique-acte.model';
import { Country, dataset } from 'src/app/models/country/country.module';
import { BordereauFactureService } from 'src/app/services/historique-acte/bordereau-facture/bordereau-facture-service.service';
import { HistoriqueActeService } from 'src/app/services/historique-acte/historique-acte.service';
import { HistoriqueService } from 'src/app/services/historique-acte/historique/historique-service.service';
import { NonFactureesGeneriqueService } from 'src/app/services/historique-acte/non-facturees/non-facturees-generique-service.service';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../../helper/sortable-header.directive';


@Component({
  selector: 'app-historique-ordonnance',
  templateUrl: './historique-ordonnance.component.html',
  styleUrls: ['./historique-ordonnance.component.css']
})

export class HistoriqueOrdonnanceComponent implements OnInit {

  isShowDivIf = true;
  dataSourceConsultationHistory: any;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  startDate!:Date;
  endDate!:Date;
  data: Array<Country> = dataset;
  countries: Array<Country> = dataset;
  filter: string="";
  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective> | undefined;

  p: number = 1;

  selectedItems: any[] = [];
  listHistorique:HistoriqueActe[]=[]
  paramsBord= new BordereauByIdTierParams();
  collapsed = false;
  scrollingConfig: any;
  /*
  startDatee = new Date('2022-04-01');
  endDatee = new Date('2022-12-31');
**/
 
 
  
  constructor(
    private historiqueService:HistoriqueService,
    private historiqueActeService:HistoriqueActeService,
    private router:Router,
    private xmlToJson:XMLTOJSON,
    private NonfactureService:NonFactureesGeneriqueService,
    private bordereauFactureService:BordereauFactureService,
  ) {
    this.scrollingConfig = { mode: 'horizontal' };
    this.getHistorique()
    
   
   }
   filterList(){
    console.log(new Date(this.startDate))
    console.log(this.endDate)
    this.countries = this.data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(this.startDate)  && itemDate <= new Date(this.endDate);
    });
    console.log(this.countries)
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
    this.paramsBord.idTiers="4462"
    this.paramsBord.nature=CHAINE_VIDE
    this.paramsBord.dateDeb=CHAINE_VIDE
    this.paramsBord.dateFin=CHAINE_VIDE
    this.paramsBord.numPolice="A70220033"
    this.paramsBord.refFact=CHAINE_VIDE
    this.paramsBord.pagesize=99
    this.paramsBord.type=CHAINE_VIDE
    this.paramsBord.page=0

    const params:BordereauByIdTierParams={
      "idTiers": "4462",
      "nature": "",
      "dateDeb": "",
      "dateFin": "",
      "numPolice": "A70220033",
      "refFact": "",
      "pagesize": 99,
      "type": "",
      "page": 0,
      natureDent: '',
      filtre: '',
      columnSort: '',
      sortDir: ''
    }

    console.log("params"+this.paramsBord)
      // last CHAINE VIDE : this.typeFacture
      this.historiqueActeService.getFactureBordereauByIdTier(params
       ).subscribe(data => {
            const jsonObjfact = this.xmlToJson.xmlToJson(data);
           // this.AddToTableHistorique(jsonObjfact); // historique
           this.listHistorique=this.historiqueService.createElementHistorique(jsonObjfact)
           console.log(this.listHistorique)
          }, err => {
            console.error(err);
          
          });
    
  }
  AddToTableHistorique(jsonObjfact: any) {// any type required see : xmlTojson service
   
   /* if (jsonObjfact != null) {
      this.dataSourceConsultationHistory = new MatTableDataSource<HistoriqueActe>
        (this.historiqueService.createElementHistorique(jsonObjfact));
     
    }
    */
  }

  ngOnInit(): void {
    
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
}
function MatPaginator(MatPaginator: any) {
  throw new Error('Function not implemented.');
}


