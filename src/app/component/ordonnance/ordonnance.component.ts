import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import DxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule } from 'devextreme-angular';

import { lastValueFrom } from 'rxjs';
import { Employee,  ServiceFetchDATA,  State } from 'src/app/services/service.service';

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
 
  constructor(private router:Router,private service:ServiceFetchDATA ) { 
    this.dataSource = this.service.getEmployees();
    this.states = this.service.getStates();
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
