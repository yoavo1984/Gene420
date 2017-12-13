// src/app/login-page/login-test.component.ts
import { Component } from '@angular/core';
import {AF} from "../providers/af";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.css']
})
export class LoginTestComponent {
  constructor(public afService: AF, private router: Router) {}
  login() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    })
  }
}
