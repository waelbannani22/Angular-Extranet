import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import DxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule } from 'devextreme-angular';

import { lastValueFrom } from 'rxjs';
import { Employee,  ServiceFetchDATA,  State } from 'src/app/services/service.service';
import { ProfileService } from 'src/app/helper/profile.service';
import { XMLTOJSON } from 'src/app/helper/xml-tojson.service';
import { isStillValide } from 'src/app/helper/Validation';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})

export class OrdonnanceComponent implements OnInit {
  dataSource!: Employee[];

  states!: State[];

  startEditAction = 'click';

  selectTextOnEditStart = true;

  displayMode = 'full';

  showPageSizeSelector = true;

  showInfo = true;

  showNavButtons = true;
  readonly allowedPageSizes = [5, 10, 'all'];

  adherent!:string
  sexe!:string
  dateDeNaissance!:string
  numCin!:string
  paysDeNaissance!:string
  villeDeNaissance!:string
 
  constructor(private router:Router,private service:ServiceFetchDATA,private profileService:ProfileService
   , private xmlToJson: XMLTOJSON,private loginService:LoginPharmacienService
      ) { 
       // isStillValide(this.loginService)
       if (!loginService.isAuthenticated()){
        loginService.logOut()
        
     }
    this.dataSource = this.service.getEmployees();
    this.states = this.service.getStates();
    this.profileService.getMemberProfileData("00655","A70220033").subscribe(async (res:any) => {
      try {
      const jsonResult=(this.xmlToJson.xmlToJson(res))
      const obj=jsonResult['Envelope']['Body']['getContratAdherentByMatriculeResponse']['return']
      console.log(obj)
      this.adherent=obj['personnePhysique']['nomComplet']
      this.sexe=obj['personnePhysique']['sexe']['libelle']
      this.dateDeNaissance=obj['personnePhysique']['dateNaissance']
      this.numCin=obj['personnePhysique']['numeroPieceId']
      this.villeDeNaissance=obj['personnePhysique']['gouvNaissance']
      } catch (error) {
        console.log(error)
      }
    })
  }
  

 
  recherche(){
    const myButton = document.getElementById("myButton");
    const myDiv = document.getElementById("myDiv");
    const myDiv1 = document.getElementById("myDiv1");
    myDiv!.style.display="none";
    myDiv1!.style.display="initial";

  }
  
  ngOnInit(): void {
    const myButton = document.getElementById("myButton");
    const myDiv = document.getElementById("myDiv");
    const myDiv1 = document.getElementById("myDiv1");
   

   
    myDiv1!.style.display="none";
    if(myButton && myDiv){
        myButton.addEventListener("click",()=>{
          console.log("clicked")
          myDiv.style.display="none";
          myDiv1!.style.display="initial";
        })
    }
    //off canvas 
    const canvas = document.getElementById("offcanvasBoth");
    canvas!.style.visibility="block"
    
    const toggleButton = document.getElementById("toggleButton");
    toggleButton?.addEventListener("click",()=>{
       if( canvas!.style.display ==="hidden"){
        console.log("clickedd")
          canvas!.style.display= "initial"
        }else{
          canvas!.style.display="hidden";
        }
    })
    
  }
  reload() {
  
    window.location.reload();
  }
  click(){
    alert("checked")
  }
  Ordonance(){
   
    this.router.navigate(['ordonnance'], { replaceUrl: false });
  }
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  goToConjoints() {
    this.router.navigate(['Conjoints'], { replaceUrl: false });
  }
  

}
