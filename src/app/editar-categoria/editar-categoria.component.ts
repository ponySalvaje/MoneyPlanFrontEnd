import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CategoriapersonalizadaAPIService } from '../services/categoriapersonalizada-api.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  constructor(private router: Router, private categoriaPersonalizada: CategoriapersonalizadaAPIService) { }

  private description = '';
  private name = '';

  private client;

  private categoriaId;

  private categoria = {
    description: '',
    name: ''
  }

  ngOnInit() {
    this.getData();
    this.getClient();
  }

  getClient() {
    /*
    const client = {
      docId: '71653252',
      docIdType: 'DNI',
      email: 'marcesftwr2@gmail.com',
      id: 1,
      name: 'Marcelo',
      phoneNumber: '956868516'
    };
    this.client = client;
    */
    this.client = JSON.parse(localStorage.getItem('client'));
    //this.clientId = this.client.id;
  }

  getData() {
    this.categoriaId = localStorage.getItem('customCategoryId')
    this.categoriaPersonalizada.getCategoriaPersonalizadaPorId(this.categoriaId)
    .subscribe(categoria => {
      this.categoria = JSON.parse(JSON.stringify(categoria))
      this.name = this.categoria.name,
      this.description = this.categoria.description
    })
  }

  updateCategoriaPersonalizada() {
    const categoriaPersonalizada = {
      id: localStorage.getItem('customCategoryId'),
      client: this.client,
      description: this.description,
      name: this.name,
    };
    this.categoriaPersonalizada.updateCategoriaPersonalizada(categoriaPersonalizada)
    .subscribe(result => {
      this.router.navigate(['categoria']);
    });
  }

}
