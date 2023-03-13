import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conjoints',
  templateUrl: './conjoints.component.html',
  styleUrls: ['./conjoints.component.css']
})
export class ConjointsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToConjoints() {
    this.router.navigate(['Conjoints'], { replaceUrl: true });
  }

  Ordonance(){
   
    this.router.navigate(['ordonnance'], { replaceUrl: false });
  }

}
