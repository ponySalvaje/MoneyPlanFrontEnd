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

  private body;

  constructor(private http: HttpClient) { }

  generateKey(userSec: { username: string; password: string; }) {
    this.key = btoa(userSec.username + ':' + userSec.password);
  }

  generateBody(userSec: { password: string; username: string; }) {
    const body = {
      password: btoa(userSec.password),
      username: btoa(userSec.username)
    }
    this.body = JSON.parse(JSON.stringify(body));
  }

  login(userSec) {

    this.userSec = userSec;

    this.generateKey(this.userSec);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + this.key
      })
    };

    const url_api = 'http://localhost:8070/api/client/login/';
    
    this.generateBody(this.userSec);
    return this.http.post(url_api, this.body, httpOptions)
    .pipe(map(result => {
      if (result = 'OK') {
        localStorage.setItem('currentUser', this.key);
      }
      if (result !== 'OK') {
        localStorage.clear();
      }
    }
    ));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}
