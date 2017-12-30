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

  signUp(email:string, password:string, name:string, photoUrl?:string){
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
  }

  sendVerificationEmail(){
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      console.log("verification email sent");
    }).catch(function(error) {
      console.log("error in sending verification email: "+error)
    });
  }

  login(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        this.router.navigate(['home']);
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
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
        this.router.navigate(['home']);
        // ...
      }
    });
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

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
    let photoUrl = firebase.auth().currentUser.photoURL
    if (!photoUrl || photoUrl == ""){
      photoUrl = "/assets/photo.jpg";
    }
    return photoUrl;
  }


  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.signOut();
  }
}
