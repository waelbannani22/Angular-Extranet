import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-pharmacien',
  templateUrl: './dashboard-pharmacien.component.html',
  styleUrls: ['./dashboard-pharmacien.component.css']
})
export class DashboardPharmacienComponent implements OnInit {
  imageChemin:any = "/assets/img/avatars/1.png";

  constructor() { }

  ngOnInit(): void {
  }

}
