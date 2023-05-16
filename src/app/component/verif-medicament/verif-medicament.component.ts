import { XmlParser } from '@angular/compiler';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CHAINE_VIDE } from 'src/app.constants';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { MedicamentElement } from 'src/app/models/medic/medicament-element.model';
import { VerifierMedicamentResultService } from './verif-medicament-service.service';

@Component({
  selector: 'app-verif-medicament',
  templateUrl: './verif-medicament.component.html',
  styleUrls: ['./verif-medicament.component.css']
})
export class VerifMedicamentComponent implements OnInit {
  listMedic:MedicamentElement[]=[]
  collapsed = false;
  constructor(
    private xmltoJson:XMLTOJSON,
    private router:Router,
    private verifSerivce:VerifierMedicamentResultService,
    private formBuilder: FormBuilder,
  ) { 
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
    this.verifSerivce.getListActesPhar(CHAINE_VIDE,"A70230001").subscribe(async (res:any) => {
      try {
        const jsonObj=this.xmltoJson.xmlToJson(res)
        console.log(jsonObj)
        this.listMedic=this.verifSerivce.createMedicamentData(jsonObj)!
       // console.log(this.verifSerivce.createMedicamentData(jsonObj))

      } catch (error) {
        console.error(error)
      }
      
    })
  }
  ngOnInit(): void {
  }

}
