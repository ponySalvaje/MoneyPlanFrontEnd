import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private AuthService: AuthService) { }
  private id = 0;

  private username;

  private password;

  private userSec;

  ngOnInit() {
  }

  authenticateUser() {
    let userSec = {
      id: this.id,
      username: this.username,
      password: this.password
    }
    this.userSec = userSec;

    this.AuthService.login(this.userSec)
    .subscribe(result => { 
      console.log(result);
    })
  }
}
