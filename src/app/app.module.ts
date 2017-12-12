import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {Routes, RouterModule} from "@angular/router";
import { ScienceComponent } from './science/science.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}

  //{ path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    ScienceComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
