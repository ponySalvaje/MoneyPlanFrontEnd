import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransaccionAPIService {
  transaccion: Observable<any>;

  constructor(private http: HttpClient) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic bWFyY2VzZnR3cjJAZ21haWwuY29tOndlbGNvbWUx"
  })

  getAllTransaccionsFromClient(clientId) {
    const url_api = `http://localhost:8070/api/transaction/client/${clientId}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  saveTransaccion(transaccion) {
    const url_api = 'http://localhost:8070/api/transaction/';

    return this.http.post(url_api, transaccion, {headers: this.headers, withCredentials: true})
    .pipe(map(data => data));
  }
}
