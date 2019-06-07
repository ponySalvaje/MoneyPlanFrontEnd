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

  private client;

  ngOnInit() {
    this.getLocalStorage();
    this.getClient();
  }


  changeAhorro() {
    this.saveLocalStorage();
  }

  getClient() {
    let client = {
      docId: "71653252",
      docIdType: "DNI",
      email: "marcesftwr2@gmail.com",
      id: 1,
      name: "Marcelo",
      phoneNumber: "956868516"
    }
    this.client = client;
  }

  saveLocalStorage() {
    let ahorro = {
      ahorro_cantidad: this.ahorro_cantidad,
      ahorro_descripcion: this.ahorro_descripcion
    }
    localStorage.setItem('ahorro', JSON.stringify(ahorro));
  }

  getLocalStorage() {
    let localStorageItem = JSON.parse(localStorage.getItem('ahorro'));
    if (localStorageItem) {
      this.ahorro_cantidad = localStorageItem.ahorro_cantidad;
      this.ahorro_descripcion = localStorageItem.ahorro_descripcion;
    }
  }

}
