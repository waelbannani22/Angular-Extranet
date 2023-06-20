import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css'],
})
export class PassComponent implements OnInit {
  password: string = '';
  passwordShown: boolean = false;
  Cpassword: string = '';
  role!:string
  togglePasswordVisibility() {
    this.passwordShown = !this.passwordShown;
  }

  constructor(private router: Router) {
    this.role = sessionStorage.getItem("role")!
  }

  Profile() {
    this.router.navigate(['/DashboardPharmacien'], { replaceUrl: false });
  }
  Pass() {
    this.router.navigate(['/Pass'], { replaceUrl: false });
  }
  ngOnInit(): void {}
}
