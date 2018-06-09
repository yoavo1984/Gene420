import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase/app';
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'gene420-sign-in-up-nav',
  templateUrl: './sign-in-up-nav.component.html',
  styleUrls: ['./sign-in-up-nav.component.css']
})
export class SignInUpNavComponent implements OnInit {
  public loggedIn = false;


  constructor(private authService:AuthService, private changeDetector:ChangeDetectorRef) {
    this.registerOnAuthStateChange();
  }

  ngOnInit() {

  }

  registerOnAuthStateChange(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user /*&& user.emailVerified*/) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
      this.changeDetector.detectChanges();
    });
  }

}
