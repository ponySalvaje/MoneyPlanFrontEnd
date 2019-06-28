import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ClienteAPIService } from '../../services/cliente-api.service';
import { TransaccionAPIService } from '../../services/transaccion-api.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  constructor(private router: Router, private transaccion: TransaccionAPIService) { }

  public transacciones_clientes = [];
  private transacciones = {};
  private cliente;

  public subscripciones_clientes = [];
  private subscripciones = {};

  ngOnInit() {
    this.getCliente();
    this.getListaTransacciones();
    this.getListaSubscripciones();
  }

  getCliente() {
    /*
    let cliente = {
      docId: "71653252",
      docIdType: "DNI",
      email: "marcesftwr2@gmail.com",
      id: 1,
      name: "Marcelo",
      phoneNumber: "956868516"
    }
    this.cliente = cliente;
    */
    this.cliente = JSON.parse(localStorage.getItem('client'));
    //this.clientId = this.client.id;
  }

  setTipoTransaccion(transaccion) {
    switch(transaccion.transactionType) {
      case 1: transaccion.type = 'Ingreso'; break;
      case 2: transaccion.type = 'Egreso'; break;
      case 3: transaccion.type = 'Gasto recurrente mensual'; break;
      default: transaccion.type = ''; break;
    }
  }

  getListaTransacciones() {
    const _this = this;
    this.transaccion.getAllTransaccionsFromClient(this.cliente.id)
   .subscribe(transacciones => {
      _this.transacciones = JSON.parse(JSON.stringify(transacciones));
      for (let i in _this.transacciones) {
        _this.setTipoTransaccion(_this.transacciones[i]);
        _this.transacciones_clientes.push(_this.transacciones[i]);
      }
   });
  }

  getListaSubscripciones() {
    const _this = this;
    this.transaccion.getAllSubscriptionsFromClient(this.cliente.id)
   .subscribe(subscripciones => {
      _this.subscripciones = JSON.parse(JSON.stringify(subscripciones));
      for (let i in _this.subscripciones) {
        _this.subscripciones[i].billingDate = new Date(_this.subscripciones[i].billingDate).toISOString();
        _this.subscripciones_clientes.push(_this.subscripciones[i]);
      }
   });
  }

  editSubscripcion(subscripcionId) {
    localStorage.removeItem('subscriptionId');
    localStorage.setItem('subscriptionId', subscripcionId);
    this.router.navigate(['editar-subscripcion']);
  }

  deleteSubscripcion(subscripcionId) {
    this.transaccion.deleteSubscription(subscripcionId)
    .subscribe(result => {
      // volver a cargar suscripciones y transacciones
      this.subscripciones_clientes = [];
      this.transacciones_clientes = [];
      this.ngOnInit();
    }, err => {
      console.log(err);
    })
  }

}
