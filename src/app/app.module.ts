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
import { BsModalModule } from 'ng2-bs3-modal';
import { AvatarComponent } from './avatar/avatar.component';
import { SignInUpNavComponent } from './authentication/sign-in-up-nav/sign-in-up-nav.component';
import {AuthService} from "./authentication/services/auth-service";
import { UserComponent } from './users/user/user.component';
import { UidPipe } from './users/pipes/uid.pipe';
import {UserDaoService} from "./users/services/user-dao.service";
import {AngularFireDatabase} from "angularfire2/database";
import { GeneticsPipe } from './users/pipes/genetics.pipe';
import { UserNavBarComponent } from './users/user-nav-bar/user-nav-bar.component';
import { AgePipe } from './users/pipes/age.pipe';
import { GeneticsComponent } from './users/genetics/genetics.component';
import { StrainBrowserComponent } from './browsers/strains/strain-browser/strain-browser.component';
import { StrainComponent } from './cannabis/strain/strain.component';
import {StrainDaoService} from "./cannabis/services/strain-dao.service";
import { LoadingComponent } from './loading/loading.component';
import { RatingComponent } from './rating/rating.component';
import { ReviewStrainModalComponent } from './cannabis/review-strain-modal/review-strain-modal.component';
import {RatingModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { StrainTypePipe } from './cannabis/pipes/strain-type.pipe';
import {EventBusService} from "./services/event-bus.service";
import { StrainNamePipe } from './cannabis/pipes/strain-name.pipe';
import { StrainTypeSelectorComponent } from './browsers/strains/strain-type-selector/strain-type-selector.component';
import { StrainExplorerComponent } from './explorers/strains/strain-explorer/strain-explorer.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component:UserComponent},
    { path: 'strain-browser', component:StrainBrowserComponent}
  ]},

  //{ path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
];

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
    SignInUpNavComponent,
    UserComponent,
    UidPipe,
    GeneticsPipe,
    UserNavBarComponent,
    AgePipe,
    GeneticsComponent,
    StrainBrowserComponent,
    StrainComponent,
    LoadingComponent,
    RatingComponent,
    ReviewStrainModalComponent,
    DashboardComponent,
    StrainTypePipe,
    StrainNamePipe,
    StrainTypeSelectorComponent,
    StrainExplorerComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    RatingModule,
    FormsModule,
    BsModalModule,
    ChartsModule
  ],
  providers: [UserDaoService, StrainDaoService, AuthService, AngularFireDatabase, AngularFireAuth, EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
