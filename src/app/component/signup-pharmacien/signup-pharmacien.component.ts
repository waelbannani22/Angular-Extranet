import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/helper/Validation';
import { Pharmacien } from 'src/app/models/pharmacien.model';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-signup-pharmacien',
  templateUrl: './signup-pharmacien.component.html',
  styleUrls: ['./signup-pharmacien.component.css'],
})
export class SignupPharmacienComponent implements OnInit {
  submited = false;
  isSuccessful=false;
  detailUser: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    matricule: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    confirmPassword:new FormControl('')

   
   
  });
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private pharmacieService: LoginPharmacienService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  pharmacien: Pharmacien = new Pharmacien();

  ngOnInit(): void {
    this.detailUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      matricule: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword:['', [Validators.required]],
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }
  //getter
  get f(): { [key: string]: AbstractControl } {
    return this.detailUser.controls;
  }
  //methods
  signup(){
    this.submited=true
    this.pharmacien.nom=this.detailUser.value.nom
    this.pharmacien.prenom=this.detailUser.value.prenom
    this.pharmacien.matricule=this.detailUser.value.matricule
    this.pharmacien.password=this.detailUser.value.password
    this.pharmacien.email=this.detailUser.value.email
   
    if (this.detailUser.invalid) {
      return;
    }
    this.pharmacien.role="PHARMACIEN"
    //console.log(this.pharmacien)

    this.pharmacieService.signup(this.pharmacien).subscribe(res=>{
        this.isSuccessful=true
        this.router.navigate(['/login/']);
    },err=>{

    })
  }
}
