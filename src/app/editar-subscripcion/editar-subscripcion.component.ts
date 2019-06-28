import { Component, OnInit } from '@angular/core';
import { CategoriapredefinidaAPIService } from '../services/categoriapredefinida-api.service';
import { TransaccionAPIService } from '../services/transaccion-api.service';
import { CategoriapersonalizadaAPIService } from '../services/categoriapersonalizada-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar-subscripcion',
  templateUrl: './editar-subscripcion.component.html',
  styleUrls: ['./editar-subscripcion.component.css']
})
export class EditarSubscripcionComponent implements OnInit {

  public transactionType = [];
  public client;
  private description = '';
  private amount = 0.00;
  private categoria = 0;
  private tipo = '';
  private tipoTransaccion = -1;

  private subscripcion;

  private categoriasPredefinidas = {};
  private categoriasPersonalizadas = {};

  private subscriptionId;

  private billingDate;

  private categorias = [];
  private transacciones = [];
  private subscriptions = [];

  constructor(
    private categoriaPredefinida: CategoriapredefinidaAPIService,
    private transaccion: TransaccionAPIService,
    private categoriaPersonalizada: CategoriapersonalizadaAPIService,
    private router: Router) {
   }

  ngOnInit() {
    this.getData();
    this.getClient();
    this.getListaCategoriasPredefinidas();
    this.getListaCategoriasPersonalizadas();
  }

  getData() {
    this.subscriptionId = localStorage.getItem('subscriptionId')
    this.transaccion.getSubscriptionById(this.subscriptionId)
    .subscribe(subscripcion => {
      this.subscripcion = JSON.parse(JSON.stringify(subscripcion));
      this.amount = this.subscripcion.amount;
      this.description = this.subscripcion.description;
      this.categoria = this.subscripcion.categoryName;
      this.billingDate = this.subscripcion.billingDate;
    });
    
  }

  getListaCategoriasPersonalizadas() {
    const _this = this;
    _this.categorias.push('');
    this.categoriaPersonalizada.getCategoriaPersonalizadaPorCliente(this.client.id)
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

  getClient() {
    const client = {
      docId: '71653252',
      docIdType: 'DNI',
      email: 'marcesftwr2@gmail.com',
      id: 1,
      name: 'Marcelo',
      phoneNumber: '956868516'
    };
    this.client = client;
  }

  updateSubscription() {
    const subscription = {
      id: this.subscriptionId,
      clientId: this.client.id,
      amount: this.amount,
      description: this.description,
      billingDate: this.billingDate,
      categoryName: this.categoria,
    };
    this.transaccion.updateSubscriptionPayment(subscription)
    .subscribe(result => {
      this.router.navigate(['detalle']);
    });
  }

}
