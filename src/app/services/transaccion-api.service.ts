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
  })

  getAllTransaccionsFromClient(clientId) {
    const url_api = `http://localhost:8070/api/transaccion/cliente/${clientId}`;

    return this.http.get(url_api);
  }

  saveTransaccion(transaccion) {
    const url_api = 'http://localhost:8070/api/transaccion/';

    return this.http.post(url_api, transaccion, {headers: this.headers})
    .pipe(map(data => data));
  }
}
