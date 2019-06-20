import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ClienteAPIService } from 'src/app/services/cliente-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private clientService: ClienteAPIService) { }
  private id = 0;

  private username;

  private password;

  private userSec;

  ngOnInit() {
  }

  authenticateUser() {
    const userSec = {
      id: this.id,
      username: this.username,
      password: this.password
    };
    let clientId;
    this.userSec = userSec;

    this.authService.login(this.userSec)
    .subscribe(result => {
      this.router.navigate(['']);
    }, error => {
      if (error.status == 401) {
        Swal.fire({
          type: 'error',
          title: 'Lo sentimos...',
          text: '¡Usuario y contraseña incorrectos!'
        });
      }
    });
    /*
    this.clientService.getInfo(this.userSec.username)
    .subscribe(result => {
      clientId = result;
      localStorage.setItem('clientId', clientId);
    });
    */
  }
}
