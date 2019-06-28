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

  private keyAdmin = 'bWFyY2VzZnR3cjJAZ21haWwuY29tOndlbGNvbWUx';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic bWFyY2VzZnR3cjJAZ21haWwuY29tOndlbGNvbWUx'
  });

  getInfo(username) {
    const url_api = this._baseURL + '/client/user/' + btoa(username);
    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  getCliente(clientId) {
    const url_api = this._baseURL + '/client/' + clientId;
    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
