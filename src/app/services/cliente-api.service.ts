import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteAPIService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + localStorage.getItem('currentUser')
  });
  getInfo(username) {
    const url_api = 'http://localhost:8070/api/client/user/' + username;
    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
