import { XmlParser } from '@angular/compiler';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { CHAINE_VIDE } from 'src/app.constants';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { MedicamentElement } from 'src/app/models/medic/medicament-element.model';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { VerifierMedicamentResultService } from './verif-medicament-service.service';

@Component({
  selector: 'app-verif-medicament',
  templateUrl: './verif-medicament.component.html',
  styleUrls: ['./verif-medicament.component.css']
})
export class VerifMedicamentComponent implements OnInit {
  listMedic:MedicamentElement[]=[]
  collapsed = false;
  allMode:string
  checkBoxesMode:string
  isLoadIndicatorVisible: boolean = true;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  constructor(
    private xmltoJson:XMLTOJSON,
    private router:Router,
    private verifSerivce:VerifierMedicamentResultService,
    private formBuilder: FormBuilder,
    private loginService:LoginPharmacienService
  ) { 
    this.allMode = 'allPages';
    this.checkBoxesMode = "onClick";
    if (!loginService.isAuthenticated()){
      loginService.logOut()
      
   }
   this.getAllMEdic()
  }
  contentReady = (e: {
    component: { expandRow: (arg0: string[]) => void };
  }) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  
  getAllMEdic(){
   this.isLoadIndicatorVisible=true
    this.verifSerivce.getListActesPhar(CHAINE_VIDE,"A70230001").subscribe(async (res:any) => {
      try {
        const jsonObj=this.xmltoJson.xmlToJson(res)
        console.log(jsonObj)
        this.listMedic=this.verifSerivce.createMedicamentData(jsonObj)!
        this.isLoadIndicatorVisible=false
      //  this.dataGrid.instance.endCustomLoading();
       // console.log(this.verifSerivce.createMedicamentData(jsonObj))

      } catch (error) {
        console.error(error)
      }
      
    })
  }
  ngOnInit(): void {
  }

}
