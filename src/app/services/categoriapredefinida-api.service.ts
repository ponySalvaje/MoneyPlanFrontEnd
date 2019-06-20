import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class CategoriapredefinidaAPIService {

  _baseURL : string;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + localStorage.getItem('currentUser')
  });
  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  getAllCategoriaspredefinidas() {
    const url_api = this._baseURL + '/api/defaultCategory/';

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
