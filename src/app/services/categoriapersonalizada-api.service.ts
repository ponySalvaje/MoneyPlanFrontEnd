import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriapersonalizadaAPIService {
  transaccion: Observable<any>;

  constructor(private http: HttpClient) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  })

  getCategoriaPersonalizadaPorCliente(clientId) {
    const url_api = `http://localhost:8070/api/categoriaPersonalizada/cliente/${clientId}`;

    return this.http.get(url_api);
  }

  saveCategoriaPersonalizada(categoriaPersonalizada) {
    const url_api = 'http://localhost:8070/api/categoriaPersonalizada/';

    return this.http.post(url_api, categoriaPersonalizada, {headers: this.headers})
    .pipe(map(data => data));
  }
}
