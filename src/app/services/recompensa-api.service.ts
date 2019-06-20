import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class RecompensaAPIService {

  _baseURL : string;


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+localStorage.getItem("currentUser")
  })
  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

}
