import { Component, OnInit } from '@angular/core';
import { ClienteAPIService } from '../../services/cliente-api.service';
import { TransaccionAPIService } from '../../services/transaccion-api.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  constructor(private transaccion: TransaccionAPIService) { }

  public transacciones_clientes = [];
  private transacciones = {};
  private cliente;

  ngOnInit() {
    this.getCliente();
    this.getListaTransacciones();
  }

  getCliente() {
    let cliente = {
      docId: "71653252",
      docIdType: "DNI",
      email: "marcesftwr2@gmail.com",
      id: 1,
      name: "Marcelo",
      phoneNumber: "956868516"
    }
    this.cliente = cliente;
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

}
