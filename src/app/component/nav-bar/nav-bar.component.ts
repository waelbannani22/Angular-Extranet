import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private router:Router) { }
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  menuToggle(){
    const toggleMenu = document.querySelector(".menu");
    toggleMenu!.classList.toggle("active");
  }
  ngOnInit(): void {
  }
  onClick() {
   
   this.router.navigate(['/DashboardPharmacien'], { replaceUrl: true });
    
  }

}
