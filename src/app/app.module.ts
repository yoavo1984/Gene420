import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {Routes, RouterModule} from "@angular/router";
import { ScienceComponent } from './science/science.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}

  //{ path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
];

import { AvatarComponent } from './avatar/avatar.component';
import { SignInUpNavComponent } from './authentication/sign-in-up-nav/sign-in-up-nav.component';
import {AuthService} from "./authentication/services/auth-service";


export const firebaseConfig = {
    apiKey: "AIzaSyCKUXFzVX7dCQwM91uoj67rrlUWuyu-9Xk",
    authDomain: "gene420site.firebaseapp.com",
    databaseURL: "https://gene420site.firebaseio.com",
    projectId: "gene420site",
    storageBucket: "gene420site.appspot.com",
    messagingSenderId: "819137269750"
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    ScienceComponent,
    ContactComponent,
    AvatarComponent,
    SignInUpNavComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
