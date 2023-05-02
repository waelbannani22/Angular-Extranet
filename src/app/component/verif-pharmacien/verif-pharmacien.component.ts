import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { AdminService, User } from 'src/app/services/admin.service';
import { Service } from 'src/app/services/service.service';
@Component({
  selector: 'app-verif-pharmacien',
  templateUrl: './verif-pharmacien.component.html',
  styleUrls: ['./verif-pharmacien.component.css']
})
export class VerifPharmacienComponent implements OnInit {
TogglePopOver() {
  this.popupVisible =true

}
  @ViewChild(DxDataGridComponent, { static: false }) grid!: DxDataGridComponent;
  dataSource!: User[];
 
  collapsed = false;
  popupVisible = false;
  closeButtonOptions: any;
  //serviceAdmin!:AdminService
  contentReady = (e: { component: { expandRow: (arg0: string[]) => void; }; }) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  customizeTooltip = (pointsInfo: { originalValue: string; }) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });
  data: any;
  capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  click = (e: { component: { option: (arg0: string) => any; }; }) => {
    const buttonText = e.component.option('text');
    notify(`The ${this.capitalize(buttonText)} button was clicked`);
    console.log("id wsol")
  };


  constructor(service: Service,private serviceAdmin:AdminService) {
   
    serviceAdmin.retrieveAllUserNonVerified().subscribe(res=>{
      console.log(res.body)
      this.dataSource = res.body
    },err=>{
      console.log("erreur")
    })

    this.closeButtonOptions = {
      text: 'Close',
      onClick() {
        this.popupVisible = false;
      },
    };
   
   
    //this.dataSource = service.getDataSource();
   }

  ngOnInit(): void {

  }
  ValiderUser(id: any){
    this.serviceAdmin.acceptUser(id).subscribe(res=>{
        console.log("validated")
        window.location.reload()
    },err=>{
      console.log("errorrororo",err.status)
      window.location.reload()

    })
    console.log(id)
  }
    //console.log(`Row ID: ${rowId}`);
  
  

}
function notify(arg0: string) {
  throw new Error('Function not implemented.');
}

