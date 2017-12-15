import {Injectable} from "@angular/core";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";


@Injectable()
export class AuthService {

  private callbacks;

  constructor(public af: AngularFireAuth, private router:Router) {
    this.callbacks = [];

  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in
        this.router.navigate(['home']);
        // ...
      }
    });
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  getCurrentUserUid(){
    return firebase.auth().currentUser.uid;
  }

  getCurrentUserEmail(){
    return firebase.auth().currentUser.email;
  }

  getCurrentUserDisplayName(){
    return firebase.auth().currentUser.displayName;
  }

  getCurrentUserPhotoUrl(){
    return firebase.auth().currentUser.photoURL;
  }


  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.signOut();
  }
}
