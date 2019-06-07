import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriapredefinidaAPIService {

  constructor(private http: HttpClient) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic bWFyY2VzZnR3cjJAZ21haWwuY29tOndlbGNvbWUx"
  })

  getAllCategoriaspredefinidas() {
    const url_api = 'http://localhost:8070/api/defaultCategory/';

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
}
