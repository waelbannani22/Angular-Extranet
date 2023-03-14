import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}
  isShowDivIf = true;
  iamSure: boolean = false;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu!.classList.toggle('active');
  }
  ngOnInit(): void {}
  onClick() {
    this.router.navigate(['/DashboardPharmacien'], { replaceUrl: true });
  }
  logOut() {
    console.log('logout clicked');
    window.sessionStorage.clear();
    console.log('session cleaned');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  Profile() {
    console.log('session cleaned');
    this.router.navigate(['/DashboardPharmacien'], { replaceUrl: false });
  }
  ToOrdonnance() {
    this.router.navigate(['/ordonnance'], { replaceUrl: true });
  }
  ToHistoriqueOrdonnance() {
    this.router.navigate(['/HistoriqueOrdonnance'], { replaceUrl: true });
  }
}
