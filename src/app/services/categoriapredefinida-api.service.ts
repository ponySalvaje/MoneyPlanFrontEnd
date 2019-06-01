import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriapredefinidaAPIService {

  constructor(private http: HttpClient) { }

  getAllCategoriaspredefinidas() {
    const url_api = 'http://localhost:8070/api/categoriaPredefinida/';

    return this.http.get(url_api);
  }
}
