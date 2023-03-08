import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  click(){
    alert("checked")
  }
  Ordonance(){
    alert("checked")
    this.router.navigate(['/ordonnance'], { replaceUrl: true });
  }
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
   
  }

}
