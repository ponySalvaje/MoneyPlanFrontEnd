import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { BoundAttribute } from '../../../node_modules/@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  transaccion: Observable<any>;

  private key = '';

  private userSec;
  
  //"Authorization": "Basic " + btoa(userSec.username+":"+userSec.password)

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+this.key
  })

  constructor(private http: HttpClient) { }

  generateKey(userSec) {
    this.key = btoa(userSec.username+":"+userSec.password);
  }

  login(userSec) {
    const url_api = 'http://localhost:8070/api/client/login';

    this.userSec = userSec;
    this.generateKey(this.userSec);
    return this.http.post(url_api, this.userSec, {headers: this.headers, withCredentials: true})
    .pipe(map(result => {
      if (result = 'OK') {
        localStorage.setItem('currentUser', JSON.stringify(this.key));
      }
    }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}
