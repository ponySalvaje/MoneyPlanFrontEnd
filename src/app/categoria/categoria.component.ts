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

  private cliente;

  private categoriasPersonalizadas;

  constructor(private categoriaPersonalizada: CategoriapersonalizadaAPIService) { }

  ngOnInit() {
    this.getLocalStorage();
    this.getCliente();
    this.getCategoriaPersonalizadaPorCliente();
  }

  changeCategoria() {
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

  getCategoriaPersonalizadaPorCliente() {
    const _this = this;
    this.categoriaPersonalizada.getCategoriaPersonalizadaPorCliente(this.cliente.id)
    .subscribe(categoriasPersonalizada => { 
      _this.categoriasPersonalizadas = JSON.parse(JSON.stringify(categoriasPersonalizada));
      console.log(categoriasPersonalizada);
      for (let i in _this.categoriasPersonalizadas) {
        _this.categorias.push(_this.categoriasPersonalizadas[i]);
      }
    })
  }

  saveCategoriaPersonalizada() {
    let categoriaPersonalizada = {
      cliente: this.cliente,
      description: this.description,
      name: this.name,
    }
    this.categoriaPersonalizada.saveCategoriaPersonalizada(categoriaPersonalizada)
    .subscribe(categoriaPersonalizada => { 
      this.categoriasPersonalizadas.push(categoriaPersonalizada);
      this.description = '';
      this.name = '';
      this.saveLocalStorage();
    })
  }

  saveLocalStorage() {
    let categoria = {
      description: this.description,
      name: this.name
    }
    localStorage.setItem('categoriaPersonalizada', JSON.stringify(categoria));
  }

  getLocalStorage() {
    let localStorageItem = JSON.parse(localStorage.getItem('categoriaPersonalizada'));
    if (localStorageItem) {
      this.description = localStorageItem.description;
      this.name = localStorageItem.name;
    }
  }

}
