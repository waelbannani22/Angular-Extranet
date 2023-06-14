import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
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

  matriculeAdherent=""

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
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
          matriculeAdherent: this.matriculeAdherent,
          type: this.selectedValue,
        };

        return this.sendRequest(this.url + '/add-acte', 'POST', {
          date: values.date,
          matriculeAdherent: values.matriculeAdherent,
          type: this.selectedValue,
        });
      },
      //update
      update: (key, values) =>
        this.sendRequest(this.url + '/updateActe/' + key, 'PUT', {
          date: values.date,
          matriculeAdherent: values.matriculeAdherent,
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
      result = this.http.put(url, httpOptions2);
    } else if (method === 'POST') {
      httpOptions2 = data;
      console.log(data)
      console.log(this.lookupData);
      result = this.http.post(url, httpOptions2);
      /*
      result = result.pipe(
        tap(() => {
          if (method === 'POST') {
            this.selectedValue = null; // Clear the selected value only for POST request
          }
        })
      );
      */
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
  isODOGHidden(){
    if(this.selectedValue=="Monture" ||this.selectedValueQte==2){
      return true;
    }else return false;
  }
  isNatureHidden(){
    if(this.selectedValue=="Monture" ||this.selectedValue=="Lentille de contact"  ){
      return true;
    }
    
    return false
  }
  isQteHidden(){
    if(this.selectedValue=="Monture"){
      return true
    }
    return false;
  }
  onPopupHiding() {
    console.log("canceled")
    this.selectedValue=""
    this.selectedValueGD=""
    this.selectedValueNature=""
    this.selectedValueQte=""
  }
}
