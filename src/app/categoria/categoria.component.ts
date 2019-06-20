import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { CategoriapersonalizadaAPIService } from '../services/categoriapersonalizada-api.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private description = '';
  private name = '';

  private categorias = [];

  private client;

  private clientId;

  private categoriasPersonalizadas = [];

  constructor(private categoriaPersonalizada: CategoriapersonalizadaAPIService) { }

  ngOnInit() {
    this.getLocalStorage();
    this.getClient();
    this.getCategoriaPersonalizadaPorCliente();
  }

  changeCategoria() {
    this.saveLocalStorage();
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
    this.clientId = client.id;
    //this.clientId = localStorage.getItem('clientId');
  }

  getCategoriaPersonalizadaPorCliente() {
    this.categoriaPersonalizada.getCategoriaPersonalizadaPorCliente(this.clientId)
    .subscribe(result => {
      this.categoriasPersonalizadas = JSON.parse(JSON.stringify(result));
      for (const i in this.categoriasPersonalizadas) {
        this.categorias.push(this.categoriasPersonalizadas[i]);
      }
    }, err => {
      console.log(err);
    });
  }

  saveCategoriaPersonalizada() {
    const categoriaPersonalizada = {
      client: this.client,
      description: this.description,
      name: this.name,
    };
    this.categoriaPersonalizada.saveCategoriaPersonalizada(categoriaPersonalizada)
    .subscribe(categoriaPersonalizada => {
      this.categoriasPersonalizadas.push(categoriaPersonalizada);
      this.description = '';
      this.name = '';
      this.saveLocalStorage();

      // volver a cargar categorias
      this.categorias = [];
      this.ngOnInit();
    });
  }

  saveLocalStorage() {
    const categoria = {
      description: this.description,
      name: this.name
    };
    localStorage.setItem('categoriaPersonalizada', JSON.stringify(categoria));
  }

  getLocalStorage() {
    const localStorageItem = JSON.parse(localStorage.getItem('categoriaPersonalizada'));
    if (localStorageItem) {
      this.description = localStorageItem.description;
      this.name = localStorageItem.name;
    }
  }

}
