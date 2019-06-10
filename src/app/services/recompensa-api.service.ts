import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecompensaAPIService {


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+localStorage.getItem("currentUser")
  })
  constructor(private http: HttpClient) { }

}
