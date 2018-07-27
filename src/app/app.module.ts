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
import { StrainCarouselComponent } from './browsers/strains/strain-carousel/strain-carousel.component';
import { MoodWizardsComponent } from './wizards/mood-wizards/mood-wizards.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import {Ng2CarouselamosModule} from "ng2-carouselamos";
import { StrainViewComponent } from './users/strain-view/strain-view.component';
import {ContactService} from "./contact/contact.service";
import { SubmitModalComponent } from './contact/submit-modal/submit-modal.component';
import { BetaTesterComponent } from './beta-tester/beta-tester.component';
import {MatcherService} from "./cannabis/services/matcher.service";
import { GeneticsModalComponent } from './users/modals/genetics-modal/genetics-modal.component';
import { UploadComponent } from './users/upload/upload/upload.component';
import {GeneticsDataUploaderService} from "./users/services/genetics-data-uploader.service";
import {HttpClientModule} from "@angular/common/http";
import {ServerMockService} from "./services/server-mock.service";
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { HealthQuestionnaireComponent } from './questionnaire/health-questionnaire/health-questionnaire.component';
import { ProgressComponent } from './questionnaire/progress/progress.component';
import { PersonalQuestionnaireComponent } from './questionnaire/personal-questionnaire/personal-questionnaire.component';
import { PreferencesQuestionnaireComponent } from './questionnaire/preferences-questionnaire/preferences-questionnaire.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'beta-tester', component: BetaTesterComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: QuestionnaireComponent},
  {path: 'user-details', component: UserComponent},
  {path: 'wizard', component: MoodWizardsComponent},
  {path: 'user', component: StrainBrowserComponent,
    children: [
    { path: '', component:StrainBrowserComponent},
    { path: 'strain-browser', component:StrainBrowserComponent},
    { path: 'type-browser', component:StrainTypeSelectorComponent},
    { path: 'carousel-browser', component:StrainCarouselComponent},
    { path: 'upload', component:UploadComponent}
  ]}
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
    StrainExplorerComponent,
    StrainCarouselComponent,
    StrainViewComponent,
    MoodWizardsComponent,
    SubmitModalComponent,
    BetaTesterComponent,
    GeneticsModalComponent,
    UploadComponent,
    QuestionnaireComponent,
    HealthQuestionnaireComponent,
    ProgressComponent,
    PersonalQuestionnaireComponent,
    PreferencesQuestionnaireComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    RatingModule,
    FormsModule,
    BsModalModule,
    ChartsModule,
    FlexLayoutModule,
    Ng2CarouselamosModule,
    HttpClientModule

  ],
  providers: [
    AuthService,
    UserDaoService,
    StrainDaoService,
    AngularFireDatabase,
    AngularFireAuth,
    EventBusService,
    ContactService,
    MatcherService,
    GeneticsDataUploaderService,
    ServerMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
