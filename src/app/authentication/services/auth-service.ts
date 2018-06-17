import {Injectable, ChangeDetectorRef} from "@angular/core";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {UserDaoService} from "../../users/services/user-dao.service";


@Injectable()
export class AuthService {

  private callbacks;
  private loggedIn: boolean;
  private user;
  private displayName;
  private photoUrl;


  constructor(public af: AngularFireAuth, private router: Router, private userDao: UserDaoService) {
    this.callbacks = [];

    this.registerOnAuthStateChange();

  }

  signUp(email: string, password: string, name: string, photoUrl?: string, shouldNavigate?: boolean): Promise<any> {

    let promise = new Promise<any>((resolve, reject)=> {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=> {
          this.setTemporaryUserDetails(name, photoUrl); //TODO: hack
          this.internalLogin(email, password).then(()=> {
            this.updateUserDetails(name, photoUrl);
            this.internalLogin(email, password);
            this.sendVerificationEmail();
            this.handleInternalSuccessfulLogin();
            resolve();
          });

          if (shouldNavigate) {
            //this.router.navigate(['home']);
          }

        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          //alert("error in signup "+errorMessage);
          reject(error.message);
        });
    });
    return promise;
    //noinspection TypeScriptUnresolvedFunction


  }

  updateUserDetails(name, photoUrl) {
    console.log("updating profile with " + name + " photoUrl " + photoUrl);
    this.user.updateProfile({
      displayName: name, photoURL: photoUrl ? photoUrl : ""
    });

  }

  sendVerificationEmail() {
    //noinspection TypeScriptUnresolvedFunction
    this.user.sendEmailVerification().then(function () {
      console.log("verification email sent");
    }).catch((error)=> {
      console.log("error in sending verification email: " + error)
    });
  }

  internalLogin(email, password): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  login(email, password) {
    //noinspection TypeScriptUnresolvedFunction
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=> {

        this.handleSuccessfulLogin();
      })
      .catch((error)=> {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        alert("could not sign in: " + errorMessage);
        // ...
      });
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in
        this.handleSuccessfulLogin();
        // ...
      }
    });
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  handleInternalSuccessfulLogin() {
    this.loggedIn = true;
  }

  handleSuccessfulLogin() {
    //if (this.isEmailVerified()){

    this.router.navigate(['user']);
    //TODO: handle email not verified
    /*}
     else {
     alert("Please verify your email before logging in");
     this.router.navigate(['home']);
     }*/

  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isEmailVerified() {
    return this.user.emailVerified;
  }

  getCurrentUser() {
    return this.user;
  }

  getCurrentUserUid() {
    return this.user.uid;
  }

  getCurrentUserEmail() {
    return this.user.email;
  }

  getCurrentUserDisplayName() {
    return this.user.displayName || this.displayName;
  }

  getCurrentUserPhotoUrl() {
    let photoUrl = this.user.photoURL || this.photoUrl;
    if (!photoUrl || photoUrl == "") {
      photoUrl = "/assets/photo.jpg";
    }
    return photoUrl;
  }

  /**
   * TODO: unify this, also registered from the avatar
   *
   */
  registerOnAuthStateChange() {
    firebase.auth().onAuthStateChanged((user)=> {
      //TODO: currently no need to verify email
      if (user /*&& user.emailVerified*/) {
        this.loggedIn = true;
        this.user = user;
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  onAuthStateChange() {
    return new Promise<any>((resolve, reject)=> {

      firebase.auth().onAuthStateChanged((user)=> {
        resolve({
          displayName: this.getCurrentUserDisplayName(),
          photoUrl: this.getCurrentUserPhotoUrl(),
          email: this.getCurrentUserEmail(),
          uid: this.getCurrentUserUid()
        });
      });

    })
  }


  /**
   * Logs out the current user
   */
  logout() {
    this.loggedIn = false;
    return this.af.auth.signOut();
  }

  private setTemporaryUserDetails(name: string, photoUrl: string) {
    this.displayName = name;
    this.photoUrl = photoUrl;
  }
}
