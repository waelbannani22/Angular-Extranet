import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPharmacienService } from 'src/app/services/login-pharmacien.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password:string=""
  token:string=""
  details: FormGroup = new FormGroup({
    password: new FormControl(''),
    token : new FormControl('')
  });
submitted: any;
  constructor( 
    private formBuilder: FormBuilder,
    private loginService: LoginPharmacienService,
    private toastr: ToastrService,
    private router :Router
   ) { }

  ngOnInit(): void {
    this.details = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8)]],
      token:['', [Validators.required,Validators.minLength(8)]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.details.controls;
  }
  // method to trigger
  ChangePassword() {
    // this.disabled =true
    // this.ema = this.details.value.email;
    this.password = this.details.value.password
    this.token=this.details.value.token
    this.loginService.changePassword(this.password,this.token).subscribe(
      res => {
        console.log(res.status)
          
            this.toastr.success('Mdp  changé','',{
              timeOut:3500
            });
            setTimeout(()=>{
              //window.location.reload()
              this.router.navigate(['/login'])
            },2000)
           // this.router.navigate(['/DashboardPharmacien'])
          
      },
      err => {
        if( err.status ==403){
          this.toastr.warning('Erreur!!','',{
            timeOut:3500
          });
          setTimeout(()=>{
            window.location.reload()
          },3000)
        }
          console.log("in error",err.status)
      }
    );
  }

}
