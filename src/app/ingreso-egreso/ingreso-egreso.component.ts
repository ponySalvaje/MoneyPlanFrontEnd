import { Component, OnInit } from '@angular/core';
import { CategoriapredefinidaAPIService } from '../services/categoriapredefinida-api.service';
import { TransaccionAPIService } from '../services/transaccion-api.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public transactionType = [];
  public cliente = {};
  private description = '';
  private amount = 0.00;
  private categoria = 0;
  private tipo = '';
  private tipoTransaccion = -1;

  private categoriaObject = {};

  private categoriasPredefinidas = {};

  private categorias = [];
  private transacciones = [];

  constructor(
    private categoriaPredefinida: CategoriapredefinidaAPIService,
    private transaccion: TransaccionAPIService) {
    
   }

  ngOnInit() {
    this.getLocalStorage();
    this.getListaCategorias();
    this.getCliente();
    this.getTipos();
  }

  getTipos() {
    this.transactionType.push(``);
    this.transactionType.push(`Ingreso`);
    this.transactionType.push(`Egreso`);
    this.transactionType.push(`Gasto recurrente mensual`);
  }

  getListaCategorias() {
    const _this = this;
    _this.categorias.push('');
    this.categoriaPredefinida.getAllCategoriaspredefinidas()
   .subscribe(categoriasPredefinidas => {
      _this.categoriasPredefinidas = JSON.parse(JSON.stringify(categoriasPredefinidas));
      for (let i in _this.categoriasPredefinidas) {
        _this.categorias.push(_this.categoriasPredefinidas[i]);
      }
   });
  }

  changeTransaction() {
    this.saveLocalStorage();
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

  setTransactionType(tipo) {
    var valor:string = tipo;
    switch(valor) {
      case "Ingreso": { this.tipoTransaccion = 1; break; }
      case "Egreso": { this.tipoTransaccion = 2; break; }
      case "Gasto recurrente mensual": { this.tipoTransaccion = 3; break; }
      default: { this.tipoTransaccion = 0; break; }
    }
  }

  saveTransaccion() {
    this.setTransactionType(this.tipo);
    let transaccion = {
      cliente: this.cliente,
      description: this.description,
      amount: this.amount,
      categoriaPredefinida: this.categorias[this.categoria],
      transactionType: this.tipoTransaccion,
      timestamp: new Date().toISOString()
    }
    this.transaccion.saveTransaccion(transaccion)
    .subscribe(transaccion =>  {
      this.transacciones.push(transaccion);
      this.description = '';
      this.amount = 0.00;
      this.categoria = 0;
      this.tipo = '';
      this.saveLocalStorage();
    })
  }

  saveLocalStorage() {
    let transaccion = {
      description: this.description,
      amount: this.amount,
      categoria: this.categoria,
      tipo: this.tipo
    }
    localStorage.setItem('transaccion', JSON.stringify(transaccion));
  }

  getLocalStorage() {
    let localStorageItem = JSON.parse(localStorage.getItem('transaccion'));
    if (localStorageItem) {
      this.description = localStorageItem.description;
      this.amount = localStorageItem.amount;
      this.categoria = localStorageItem.categoria;
      this.tipo = localStorageItem.tipo;
    }
  }

}
