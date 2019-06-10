import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaahorroAPIService {


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+localStorage.getItem("currentUser")
  })
  constructor(private http: HttpClient) { }

  getAhorroPorCliente(clientId) {
    const url_api = `http://localhost:8070/api/savingGoal/client/${clientId}`;

    return this.http.get(url_api);
  }

  saveAhorro(savingGoal) {
    const url_api = 'http://localhost:8070/api/savingGoal/';

    return this.http.post(url_api, savingGoal, {headers: this.headers})
    .pipe(map(data => data));
  }
}
