import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../authentication/services/auth-service";

@Component({
  selector: 'gene420-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  private loggedIn = false;
  private displayName;
  constructor(private authService:AuthService, private changeDetector:ChangeDetectorRef) {
    this.registerOnAuthStateChange();
  }

  ngOnInit() {

  }

  onAuthStateChanged(user){
    this.loggedIn = true;
    this.displayName = user.displayName;
    this.changeDetector.detectChanges();
  }

  logout() {
    return this.authService.logout();
  }

  registerOnAuthStateChange(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loggedIn = true;
        this.displayName = user.displayName;

      }
      else {
        this.loggedIn = false;
      }
      this.changeDetector.detectChanges();
    });
  }

}
