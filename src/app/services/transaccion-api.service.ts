import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import {AppConstants} from '../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class TransaccionAPIService {
  transaccion: Observable<any>;

  _baseURL : string;


  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+ localStorage.getItem("currentUser")
  })
  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  getAllTransaccionsFromClient(clientId) {
    const url_api = this._baseURL + `/transaction/client/${clientId}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  saveTransaccion(transaccion) {
    const url_api = this._baseURL + '/transaction/';

    return this.http.post(url_api, transaccion, {headers: this.headers, withCredentials: true})
    .pipe(map(data => data));
  }

  getExpenses(clientId, year, month) {
    const url_api = this._baseURL + `/transaction/expenses/${clientId}/${year}/${month}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  getIncomes(clientId, year, month) {
    const url_api = this._baseURL + `/transaction/incomes/${clientId}/${year}/${month}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  saveSubscriptionPayment(subscription) {
    const url_api = this._baseURL + '/subscriptionPayment/';

    return this.http.post(url_api, subscription, {headers: this.headers, withCredentials: true})
    .pipe(map(data => data));
  }

  getAllSubscriptionsFromClient(clientId) {
    const url_api = this._baseURL + `/subscriptionPayment/client/${clientId}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  deleteSubscription(subscriptionId) {
    const url_api = this._baseURL + `/subscriptionPayment/${subscriptionId}`;

    return this.http.delete(url_api, {headers: this.headers, withCredentials: true})
    .pipe(map(data => data));
  }

  getSubscriptionById(subscriptionId) {
    const url_api = this._baseURL + `/subscriptionPayment/${subscriptionId}`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }

  updateSubscriptionPayment(subscription) {
    const url_api = this._baseURL + `/subscriptionPayment/${subscription.id}`;

    return this.http.put(url_api, subscription, {headers: this.headers, withCredentials: true})
    .pipe(map(data => data));
  }

  getExpensesByCategory(clientId, year, month) {
    const url_api = this._baseURL + `/transaction/resumen/gasto/categoria/${clientId}/${year}/${month}/`;

    return this.http.get(url_api, {headers: this.headers, withCredentials: true});
  }
  
}
