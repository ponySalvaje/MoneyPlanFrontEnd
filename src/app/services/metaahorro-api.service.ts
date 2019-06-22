import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class MetaahorroAPIService {

  _baseURL : string;


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+localStorage.getItem("currentUser")
  })
  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  getAhorroPorCliente(clientId) {
    const url_api = this._baseURL + `/savingGoal/client/${clientId}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  saveAhorro(savingGoal) {
    const url_api = this._baseURL + '/savingGoal/';

    return this.http.post(url_api, savingGoal, {headers: this.headers})
    .pipe(map(data => data));
  }
}
