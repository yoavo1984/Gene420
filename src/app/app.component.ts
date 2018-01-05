import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "./authentication/services/auth-service";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gene420';
  public isLoggedIn: boolean;
  constructor(public afService: AuthService, private router: Router) {


  }

  shouldShowNavBar(){
    return this.router.url.indexOf("dashboard")<0;
  }

  getTopMargin(){
    if (this.shouldShowNavBar()){
      return "120px";
    }
    else {
      return 0;
    }
  }
}
