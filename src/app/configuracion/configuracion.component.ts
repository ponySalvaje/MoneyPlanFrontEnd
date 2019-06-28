import { Component, OnInit } from '@angular/core';
import { MetaahorroAPIService } from '../services/metaahorro-api.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private metaAhorro: MetaahorroAPIService) { }

  private ahorro_cantidad = 0;
  private ahorro_descripcion = '';
  private ahorro_fecha_inicio;
  private ahorro_fecha_fin;

  private metas = [];

  private client;
  private clientId;

  ngOnInit() {
    this.getLocalStorage();
    this.getClient();
    this.getAhorrosPorCliente();
  }


  changeAhorro() {
    this.saveLocalStorage();
  }

  getClient() {
    /*
    let client = {
      docId: "71653252",
      docIdType: "DNI",
      email: "marcesftwr2@gmail.com",
      id: 1,
      name: "Marcelo",
      phoneNumber: "956868516"
    }
    this.client = client;
    this.clientId = client.id
    */
    this.client = JSON.parse(localStorage.getItem('client'));
    this.clientId = this.client.id;
  }

  getAhorrosPorCliente() {
    this.metaAhorro.getAhorroPorCliente(this.clientId)
    .subscribe(result => {
      this.metas = JSON.parse(JSON.stringify(result));
      for (let i in this.metas) {
        this.metas[i].startDate = new Date(this.metas[i].startDate).toISOString();
        this.metas[i].expirationDate = new Date(this.metas[i].expirationDate).toISOString();
      }
    }, err => {
      console.log(err);
    });
  }

  saveAhorroMensual() {
    let ahorro = {
      amount: this.ahorro_cantidad,
      description: this.ahorro_descripcion,
      startDate: new Date(this.ahorro_fecha_inicio).toISOString(),
      expirationDate: new Date(this.ahorro_fecha_fin).toISOString(),
      client: this.client
    }
    this.metaAhorro.saveAhorro(ahorro)
    .subscribe(ahorro =>  {
      this.ngOnInit();
      this.ahorro_descripcion = '';
      this.ahorro_cantidad = 0.00;
      this.ahorro_fecha_inicio = '';
      this.ahorro_fecha_fin = '';
      this.saveLocalStorage();
    })
  }

  saveLocalStorage() {
    let ahorro = {
      ahorro_cantidad: this.ahorro_cantidad,
      ahorro_descripcion: this.ahorro_descripcion,
      ahorro_fecha_inicio: this.ahorro_fecha_inicio,
      ahorro_fecha_fin: this.ahorro_fecha_fin
    }
    localStorage.setItem('ahorro', JSON.stringify(ahorro));
  }

  getLocalStorage() {
    let localStorageItem = JSON.parse(localStorage.getItem('ahorro'));
    if (localStorageItem) {
      this.ahorro_cantidad = localStorageItem.ahorro_cantidad;
      this.ahorro_descripcion = localStorageItem.ahorro_descripcion;
      this.ahorro_fecha_inicio = localStorageItem.ahorro_fecha_inicio;
      this.ahorro_fecha_fin = localStorageItem.ahorro_fecha_fin;
    }
  }

}
