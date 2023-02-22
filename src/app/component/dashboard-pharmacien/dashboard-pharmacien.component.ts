import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-dashboard-pharmacien',
  templateUrl: './dashboard-pharmacien.component.html',
  styleUrls: ['./dashboard-pharmacien.component.css']
})
export class DashboardPharmacienComponent implements OnInit {
  imageChemin:any = "/assets/img/avatars/1.png";
  detailPharmacien: FormGroup = new FormGroup({

    
    email: new FormControl(this.tokenStorage.getUser().email),
    nom: new FormControl(this.tokenStorage.getUser().nom),
    prenom: new FormControl(this.tokenStorage.getUser().prenom),
    matricule: new FormControl(this.tokenStorage.getUser().matricule),
    tel: new FormControl(),
    adresse: new FormControl(),
    ville: new FormControl(''),
    zip: new FormControl(''),
    cin: new FormControl('')

  });

  constructor(private tokenStorage:TokenStorageService,private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    /*
    this.detailPharmacien = this.formBuilder.group({

      email: [
        this.tokenStorage.getUser
       
      ],
      password: ['',
       
      ]

    });
    **/
   //console.log("hi ",this.tokenStorage.getUser())

  }

  

}
