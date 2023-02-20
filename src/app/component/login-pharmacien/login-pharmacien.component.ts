import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pharmacien } from 'src/app/models/pharmacien.model';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';
import { TokenStorageService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-login-pharmacien',
  templateUrl: './login-pharmacien.component.html',
  styleUrls: ['./login-pharmacien.component.css']
})
export class LoginPharmacienComponent implements OnInit {

  submitted = false;


  detailClient: FormGroup = new FormGroup({

    email: new FormControl(''),
    password: new FormControl('')

  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private formBuilder: FormBuilder, private pharmacienService: LoginPharmacienService,
    private tokenStorage: TokenStorageService,private toastr: ToastrService,private router:Router) {

  }
  pharamacien: Pharmacien = new Pharmacien();
  ngOnInit(): void {
    this.detailClient = this.formBuilder.group({

      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: ['',
        [Validators.required, Validators.minLength(7)]
      ]

    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }
  get f(): { [key: string]: AbstractControl } {
    return this.detailClient.controls;
  }
  login() {
    this.submitted = true
    this.pharamacien.email = this.detailClient.value.email
    this.pharamacien.password = this.detailClient.value.password

    if (this.detailClient.invalid) {
      return;
    }
    this.pharmacienService.login(this.pharamacien.email, this.pharamacien.password).subscribe(res => {
      console.log(res.status)
      if( res.status ==200){
        this.toastr.error('welcome back!','',{
          timeOut:3500
        });
        this.router.navigate(['/DashboardPharmacien'])
      }
      
      this.tokenStorage.saveToken(res.token)
      this.tokenStorage.saveUser(res.user)
      this.isLoggedIn = true
      this.isLoginFailed = false
      this.roles = this.tokenStorage.getUser().roles;
      // this.reloadPage();

    }, err => {
      
      if( err.status ==405){
        this.toastr.error(' user not verified','please wait for the admin to verify you!',{
          timeOut:3500
        });
      }
      if( err.status ==403){
        this.toastr.error('The credentials are wrong','',{
          timeOut:3500
        });
      }
      
      this.isLoginFailed = true;
    })

  }
  reloadPage() {
    window.location.reload();
  }


}
