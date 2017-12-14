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

  subscribeToOnAuthStateChanged(callback){
    this.callbacks.push(callback);


  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in
        for (let callback of this.callbacks){
          callback(user);
        }
        this.router.navigate(['home']);
        // ...
      }
    });
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.signOut();
  }
}
