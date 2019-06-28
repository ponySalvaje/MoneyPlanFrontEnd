import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class CategoriapersonalizadaAPIService {
  transaccion: Observable<any>;

  _baseURL: string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  getCategoriaPersonalizadaPorCliente(clientId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = this._baseURL + `/customCategory/client/${clientId}`;

    return this.http.get(url_api, httpOptions);
  }

  deleteCategoriapredefinida(categoryId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = this._baseURL + `/customCategory/${categoryId}`;

    return this.http.delete(url_api, httpOptions);
  }

  saveCategoriaPersonalizada(categoriaPersonalizada) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = this._baseURL + '/customCategory/';

    return this.http.post(url_api, categoriaPersonalizada, httpOptions)
    .pipe(map(data => data));
  }

  updateCategoriaPersonalizada(categoriaPersonalizada) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = this._baseURL + '/customCategory/' + categoriaPersonalizada.id;

    return this.http.put(url_api, categoriaPersonalizada, httpOptions)
    .pipe(map(data => data));
  }

  getCategoriaPersonalizadaPorId(categoriaId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('currentUser')
      })
    };

    const url_api = this._baseURL + '/customCategory/' + categoriaId;

    return this.http.get(url_api, httpOptions)
    .pipe(map(data => data));
  }
}
