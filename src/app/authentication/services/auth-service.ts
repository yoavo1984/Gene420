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
  private user;

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
    this.user.updateProfile({
      displayName: name, photoURL:photoUrl?photoUrl:""
    });
    this.userDao.updateUserGenetics(this.getCurrentUserUid(), { //TODO: mock with random data
      "creative":0,
      "funny": 1,
      "energetic": 0,
      "desire": 0,
      "stimulation": 2,
      "anxious": 0,
      "paranoia": 0,
      "obesity": 0,
      "narcolapsy": 1,
      "pain": 0,
      "dependence": 0
    })
  }

  sendVerificationEmail(){
    //noinspection TypeScriptUnresolvedFunction
    this.user.sendEmailVerification().then(function() {
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
    return this.user.emailVerified;
  }

  getCurrentUser(){
    return this.user;
  }

  getCurrentUserUid(){
    return this.user.uid;
  }

  getCurrentUserEmail(){
    return this.user.email;
  }

  getCurrentUserDisplayName(){
    return this.user.displayName;
  }

  getCurrentUserPhotoUrl(){
    let photoUrl = this.user.photoURL;
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
        this.user = user;
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  onAuthStateChange(){
    return new Promise<any>((resolve, reject)=>{
      if (this.isLoggedIn()){
        resolve(this.user);
      }
      else {
        firebase.auth().onAuthStateChanged((user)=> {
          resolve({
            displayName: this.getCurrentUserDisplayName(),
            photoUrl: this.getCurrentUserPhotoUrl(),
            email: this.getCurrentUserEmail()
          });
        });
      }
    })
  }


  /**
   * Logs out the current user
   */
  logout() {
    this.loggedIn = false;
    return this.af.auth.signOut();
  }
}
