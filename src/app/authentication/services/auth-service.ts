import {Injectable, ChangeDetectorRef} from "@angular/core";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {UserDaoService} from "../../users/services/user-dao.service";


@Injectable()
export class AuthService {

  private callbacks;
  private loggedIn:boolean;

  constructor(public af: AngularFireAuth, private router:Router, private userDao:UserDaoService) {
    this.callbacks = [];

    this.registerOnAuthStateChange();

  }

  signUp(email:string, password:string, name:string, photoUrl?:string){
    //noinspection TypeScriptUnresolvedFunction
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
        this.sendVerificationEmail();
        this.updateUserDetails(name, photoUrl);
        this.router.navigate(['home']);
      })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error in signup "+errorMessage);
    });

  }

  updateUserDetails(name, photoUrl){
    console.log("updating profile with "+name +" photoUrl"+photoUrl);
    firebase.auth().currentUser.updateProfile({
      displayName: name, photoURL:photoUrl?photoUrl:""
    });
    this.userDao.updateUserGenetics(this.getCurrentUserUid(), {
      "craving": 2,
        "psychosis": 3,
        "memory": 0,
        "dependence": 1,
        "decision": 4
    })
  }

  sendVerificationEmail(){
    //noinspection TypeScriptUnresolvedFunction
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      console.log("verification email sent");
    }).catch((error)=> {
      console.log("error in sending verification email: "+error)
    });
  }

  login(email, password){
    //noinspection TypeScriptUnresolvedFunction
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{

        this.handleSuccessfulLogin();
      })
      .catch((error)=> {
      // Handle Errors here.

      var errorCode = error.code;
      var errorMessage = error.message;
      alert("could not sign in: "+ errorMessage);
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

  handleSuccessfulLogin(){
    if (this.isEmailVerified()){
      this.loggedIn = true;
      this.router.navigate(['dashboard']);
    }
    else {
      alert("Please verify your email before logging in");
      this.router.navigate(['home']);
    }

  }

  isLoggedIn():boolean{
    return this.loggedIn;
  }

  isEmailVerified(){
    return firebase.auth().currentUser.emailVerified;
  }

  getCurrentUser(){
    return firebase.auth().currentUser;
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
    let photoUrl = firebase.auth().currentUser.photoURL;
    if (!photoUrl || photoUrl == ""){
      photoUrl = "/assets/photo.jpg";
    }
    return photoUrl;
  }

  /**
   * TODO: unify this, also registered from the avatar
   *
   */
  registerOnAuthStateChange(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user && user.emailVerified) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    });
  }


  /**
   * Logs out the current user
   */
  logout() {
    this.loggedIn = false;
    return this.af.auth.signOut();
  }
}
