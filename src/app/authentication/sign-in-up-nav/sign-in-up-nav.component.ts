import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'gene420-sign-in-up-nav',
  templateUrl: './sign-in-up-nav.component.html',
  styleUrls: ['./sign-in-up-nav.component.css']
})
export class SignInUpNavComponent implements OnInit {
  private loggedIn = false;


  constructor(private authService:AuthService) {
    this.authService.subscribeToOnAuthStateChanged((user)=>{this.onAuthStateChanged()});
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit() {

  }

  onAuthStateChanged(){
    this.loggedIn = true;
  }

}
