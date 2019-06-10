import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriapredefinidaAPIService {


  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + localStorage.getItem('currentUser')
  });
  constructor(private http: HttpClient) { }

  getAllCategoriaspredefinidas() {
    const url_api = 'http://localhost:8070/api/defaultCategory/';

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
