import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Pharmacien } from 'src/app/models/pharmacien.model';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader.service';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-dashboard-pharmacien',
  templateUrl: './dashboard-pharmacien.component.html',
  styleUrls: ['./dashboard-pharmacien.component.css'],
})
export class DashboardPharmacienComponent implements OnInit {
  imageChemin: any = '/assets/img/avatars/1.png';
  iamSure: boolean = false;
  disabled:boolean=true;
  role=""
  buttonLabel:string="modifier le formulaire"
  nomPrenom!:string
  detailPharmacien: FormGroup = new FormGroup({
    id:new FormControl(this.tokenStorage.getUser().id),
    password:new FormControl(this.tokenStorage.getUser().password),
    email: new FormControl(this.tokenStorage.getUser().email),
    nom: new FormControl(this.tokenStorage.getUser().nom),
    prenom: new FormControl(this.tokenStorage.getUser().prenom),
    matricule: new FormControl(this.tokenStorage.getUser().matricule),
    tel: new FormControl(this.tokenStorage.getUser().tel),
    adresse: new FormControl(this.tokenStorage.getUser().addresse),
    ville: new FormControl(this.tokenStorage.getUser().ville),
    zip: new FormControl(this.tokenStorage.getUser().zip),
    cin: new FormControl(this.tokenStorage.getUser().cin),
  });

  constructor(
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pharmacienService:LoginPharmacienService,
    private http:HttpClient,
    private dynamicScriptLoader:DynamicScriptLoaderService
  ) {
    this.role = sessionStorage.getItem("role")!
    this.nomPrenom=this.tokenStorage.getUser().nom+" "+this.tokenStorage.getUser().prenom
  }

  pharamacien: Pharmacien = new Pharmacien();

  ngOnInit(): void {
   // this.loadScripts()
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('main','config').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
  //************* */ responsive nav
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  //*********** */
  clickIamSure() {
    
    this.iamSure= !this.iamSure
    console.log("am sure:"+this.iamSure)
  }
  disableChamps():void{
    this.disabled = !this.disabled
    if(this.disabled){
       this.buttonLabel="modifier le formulaire"
    }else{
      this.buttonLabel="annuler"
    }
    
  }
  logOut() {
    if (this.iamSure) {
      console.log("logout clicked")
      window.sessionStorage.clear();
      console.log("session cleaned")
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
  updateInfo(){
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+token,
      'Access-Control-Allow-Methods':'PUT',
      'Access-Control-Allow-Credentials':'true'
    });
    this.pharamacien.id = this.detailPharmacien.value.id;
    this.pharamacien.nom = this.detailPharmacien.value.nom;
    this.pharamacien.prenom = this.detailPharmacien.value.prenom;
    this.pharamacien.email = this.detailPharmacien.value.email;
    this.pharamacien.password = this.detailPharmacien.value.password;
    this.pharamacien.tel = this.detailPharmacien.value.tel;
    this.pharamacien.cin = this.detailPharmacien.value.cin;
    this.pharamacien.addresse = this.detailPharmacien.value.adresse;
    this.pharamacien.ville = this.detailPharmacien.value.ville;
    this.pharamacien.isActivated=true
    this.pharamacien.zip=this.detailPharmacien.value.zip;

    console.log(JSON.stringify(this.pharamacien))
    this.pharmacienService.updateInfo(this.pharamacien).subscribe(res=>{
      
      window.sessionStorage.removeItem("auth-user");
     
        this.tokenStorage.saveUser(res.body.user)
        window.location.reload();
    },err=>{
      alert(console.error(err));
      
    })
  }
  welcomeTest(){
    const token = sessionStorage.getItem('token'); 
   // const headersn = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const httpOptions ={
      headers :new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
     
      'Access-Control-Allow-Methods':'GET',
     
      'Access-Control-Allow-Credentials':'false'
    })
    } 
    this.http.get('http://localhost:8089/Stage/Pharmacien/welcome' )
    .subscribe((response) => {
      alert("ok good")
    }, (error) => {
      alert("nooooooooo")
    });
  }
  Profile() {
   
    
    this.router.navigate(['/DashboardPharmacien'], { replaceUrl: false }); 
  }
  Pass() {
   
    
    this.router.navigate(['/Pass'], { replaceUrl: false }); 
}
}
