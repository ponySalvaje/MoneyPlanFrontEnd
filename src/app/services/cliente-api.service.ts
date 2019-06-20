import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ClienteAPIService {

  _baseURL : string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + localStorage.getItem('currentUser')
  });
  getInfo(username) {
    const url_api = this._baseURL + '/client/user/' + btoa(username);
    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
