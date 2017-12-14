import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'gene420-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.loginWithGoogle();
  }

  ngOnInit() {

  }


}
