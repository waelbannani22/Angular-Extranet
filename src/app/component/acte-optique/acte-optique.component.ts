import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxButtonModule,
} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';

import { Observable, lastValueFrom, tap } from 'rxjs';
@Component({
  selector: 'app-acte-optique',
  templateUrl: './acte-optique.component.html',
  styleUrls: ['./acte-optique.component.css'],
})
export class ActeOptiqueComponent implements OnInit {
  dataSource: any;

  customersData: any;

  shippersData: any;

  refreshModes!: string[];

  refreshMode!: string;

  requests: string[] = [];

  url = 'http://localhost:8089/Stage/acte-optique';

  lookupData!: any[];
  lookupDataGD!: any[];
  lookupDataQte!: any[];
  lookupDataNature!: any[];

  selectedValue: any = null;
  selectedValueGD: any = null;
  selectedValueQte: any = null;
  selectedValueNature: any = null;

  
   matriculeAdherent !:string;

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

  constructor(private http: HttpClient) {
    this.refreshMode = 'full';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.dataSource = new CustomStore({
      key: 'id',
      //load
      load: async () => {
        try {
          const data = await this.sendRequest(this.url + '/get-allActes');
          return {
            data: data,
          };
        } catch (error) {
          console.error('Error loading data:', error);
          throw error;
        }
      },
      //delete
      remove: (key) =>
        this.sendRequest(this.url + '/deleteActe/' + key, 'DELETE', {
          key,
        }),
      //add
      insert: (values) => {
        const postData = {
          date: values.date,
          matriculeAdherent: values.matriculeAdherent,
          type: this.selectedValue,
          qte: values.qte,
          mntDepense: values.mntDepense,
          mntRevise: values.mntRevise,
          decompteRO: values.decompteRO,
          nature: values.nature,
          OGOD: values.OGOD,
        };

        return this.sendRequest(this.url + '/add-acte', 'POST', {
          date: values.date,
          matriculeAdherent: values.matriculeAdherent,
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
          verresSpec:this.specialBoxL
        });
      },
      //update
      update: (key, values) =>
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
 

  ngOnInit(): void {}

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

  clearRequests() {
    this.requests = [];
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
}
