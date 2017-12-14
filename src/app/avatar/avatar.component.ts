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

  //user details
  private displayName;
  private email;
  private photoUrl;
  private emailVerified;
  private uid;

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

  navigateToPrivateArea() {
    //TODO: complete
  }


  registerOnAuthStateChange(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.loggedIn = true;
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoUrl = user.photoURL;
        this.emailVerified = user.emailVerified;
        this.uid = user.uid;

      }
      else {
        this.loggedIn = false;
      }
      this.changeDetector.detectChanges();
    });
  }

}
