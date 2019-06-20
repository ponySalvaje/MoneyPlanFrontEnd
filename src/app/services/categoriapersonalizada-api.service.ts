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

  getCategoriaPersonalizadaPorCliente(clientId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = `http://localhost:8070/api/customCategory/client/${clientId}`;

    return this.http.get(url_api, httpOptions);
  }

  saveCategoriaPersonalizada(categoriaPersonalizada) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = 'http://localhost:8070/api/customCategory/';

    return this.http.post(url_api, categoriaPersonalizada, httpOptions)
    .pipe(map(data => data));
  }
}
