import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})

export class OrdonnanceComponent implements OnInit {


  constructor(private router:Router,private location: Location) { }
 
  
  
  ngOnInit(): void {
    const myButton = document.getElementById("myButton");
    const myDiv = document.getElementById("myDiv");
    const myDiv1 = document.getElementById("myDiv1");
   

   
    myDiv1!.style.display="none";
    if(myButton && myDiv){
        myButton.addEventListener("click",()=>{
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
