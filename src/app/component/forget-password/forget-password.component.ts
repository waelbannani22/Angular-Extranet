import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  disabled:boolean=true;
  submitted = false;
  isLoading=false;
  ema: string = '';
  details: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginPharmacienService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.details = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  //*******

  get f(): { [key: string]: AbstractControl } {
    return this.details.controls;
  }
  goToLogin(){
    this.router.navigate(['/login'], { replaceUrl: true })
  }
  forgetPass() {
    this.disabled =true
   
    if(this.details.valid){
      this.isLoading=true
       this.ema = this.details.value.email;
    this.loginService.forgetPassword(this.ema).subscribe(
      res => {
        console.log(res.status)
          
            this.toastr.success('Email  trouvé','',{
              timeOut:3500
            });
            setTimeout(()=>{
              //window.location.reload()
              this.isLoading=false;
              this.router.navigate(['/change-password'])
            },2000)
           // this.router.navigate(['/DashboardPharmacien'])
          
      },
      err => {
        if( err.status ==403){
          this.toastr.warning('Email non trouvé','',{
            timeOut:3500
          });
          setTimeout(()=>{
            this.isLoading=false;
            window.location.reload()
          },3000)
        }
          console.log("in error",err.status)
      }
    );
  }
    }
   
}
