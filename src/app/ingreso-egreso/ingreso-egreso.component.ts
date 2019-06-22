import { Component, OnInit } from '@angular/core';
import { CategoriapredefinidaAPIService } from '../services/categoriapredefinida-api.service';
import { TransaccionAPIService } from '../services/transaccion-api.service';
import { CategoriapersonalizadaAPIService } from '../services/categoriapersonalizada-api.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public transactionType = [];
  public cliente;
  private description = '';
  private amount = 0.00;
  private categoria = 0;
  private tipo = '';
  private tipoTransaccion = -1;

  private categoriaObject = {};

  private categoriasPredefinidas = {};
  private categoriasPersonalizadas = {};

  private categorias = [];
  private transacciones = [];
  private subscriptions = [];

  constructor(
    private categoriaPredefinida: CategoriapredefinidaAPIService,
    private transaccion: TransaccionAPIService,
    private categoriaPersonalizada: CategoriapersonalizadaAPIService) {
   }

  ngOnInit() {
    this.getLocalStorage();
    this.getCliente();
    this.getListaCategoriasPredefinidas();
    this.getListaCategoriasPersonalizadas();
    this.getTipos();
  }

  getTipos() {
    this.transactionType.push(``);
    this.transactionType.push(`Ingreso`);
    this.transactionType.push(`Egreso`);
    this.transactionType.push(`Gasto recurrente mensual`);
  }

  getListaCategoriasPersonalizadas() {
    const _this = this;
    _this.categorias.push('');
    this.categoriaPersonalizada.getCategoriaPersonalizadaPorCliente(this.cliente.id)
   .subscribe(categoriasPersonalizadas => {
      _this.categoriasPersonalizadas = JSON.parse(JSON.stringify(categoriasPersonalizadas));
// tslint:disable-next-line: forin
      for (let i in _this.categoriasPersonalizadas) {
        _this.categorias.push(_this.categoriasPersonalizadas[i]);
      }
   });
  }

  getListaCategoriasPredefinidas() {
    const _this = this;
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
    var valor: string = tipo;
    switch (valor) {
      case "Ingreso": { this.tipoTransaccion = 1; break; }
      case "Egreso": { this.tipoTransaccion = 2; break; }
      case "Gasto recurrente mensual": { this.tipoTransaccion = 3; break; }
      default: { this.tipoTransaccion = 0; break; }
    }
  }

  saveTransaccion() {
    this.setTransactionType(this.tipo);
    if (this.tipoTransaccion == 1 || this.tipoTransaccion == 2) {
      let transaccion = {
        clientId: this.cliente.id,
        description: this.description,
        amount: this.amount,
        categoryName: this.categoria,
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
    } else {
      if (this.tipoTransaccion == 3) {
        let subscription = {
          clientId: this.cliente.id,
          description: this.description,
          amount: this.amount,
          categoryName: this.categoria,
          billingDate: new Date().toISOString()
        }
        this.transaccion.saveSubscriptionPayment(subscription)
        .subscribe(subscription => {
          this.subscriptions.push(subscription);
          this.description = '';
          this.amount = 0.00;
          this.categoria = 0;
          this.tipo = '';
          this.saveLocalStorage();
        })
      }
    }
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
