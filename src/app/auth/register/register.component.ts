import { Component, OnInit } from '@angular/core';
import { ClienteAPIService } from 'src/app/services/cliente-api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private username;
  private password;

  private name;
  private phoneNumber;
  private email;
  private docIdType;
  private docId;

  private hs_user;

  constructor(private authService: AuthService, private router: Router, private clientService: ClienteAPIService) { }

  ngOnInit() {
  }

  registerUser() {
    const hs_user = {
      client: {
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        docIdType: this.docIdType,
        docId: this.docId
      },
      user: {
        username: this.email,
        password: this.password
      }
    }
    this.hs_user = hs_user;
    this.authService.register(this.hs_user)
    .subscribe(result => {
      this.router.navigate(['']);
    }, error => {
      if (error.status) {
        Swal.fire({
          type: 'error',
          title: 'Lo sentimos...',
          text: '¡El email ya se encuentra registrado!'
        });
      }
    });
  }

}
