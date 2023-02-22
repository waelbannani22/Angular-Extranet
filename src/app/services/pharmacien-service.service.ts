import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   
  })
};
const AUTH_API ="http://localhost:8089/Stage/Pharmacien/"

@Injectable({
  providedIn: 'root'
})

export class PharmacienServiceService {

  constructor(private http:HttpClient) { }
}
