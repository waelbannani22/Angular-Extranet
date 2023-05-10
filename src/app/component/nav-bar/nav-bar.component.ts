import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  role!: string;
  prenom!:string ;
  nom!:string;

  constructor(private router: Router,
    private tokenStorage: TokenStorageService,
    ) {
     
   this.role= this.tokenStorage.getUser().role
   this.prenom= this.tokenStorage.getUser().prenom
   this.nom= this.tokenStorage.getUser().nom
    
  }
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
  ToVerifMed(){
    this.router.navigate(['/VerifMed'], { replaceUrl: true });
  }
  ToReclamation() {
    this.router.navigate(['/Reclamations'], { replaceUrl: true });
    
  }
  ToVerif() {
    this.router.navigate(['/VerifPharmacien'], { replaceUrl: true });
    
  }
}
