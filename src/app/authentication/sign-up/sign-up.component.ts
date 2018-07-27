import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {ServerMockService} from "../../services/server-mock.service";
import {UserDaoService} from "../../users/services/user-dao.service";
import {DnaDataUtils} from "../../utils/DnaDataUtils";
import {Phenome, createEmptyPhenome} from "../../users/model/Phenome";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
//Stages: 1 - initial form, 2 - DNA, 3 - Questionnaire
export class SignUpComponent implements OnInit {

  private vendorList = ["23AndMe"];

  private initialForm;
  public stage: number = 0;
  private questionnaire;
  private skipped:boolean;
  private errorSignupMessage:string = "";

  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private serverMockService: ServerMockService,
              private userDao: UserDaoService,
              private router:Router) {
  }

  resetStage(){
    this.stage = 0;
  }

  ngOnInit() {
    this.resetStage();
  }

  skipUploading() {
    this.skipped = true;
    this.stage = 2;
  }

  submit(form: any) {
    this.initialForm = form;
    this.stage = 1;
  }

  submitQuestionnaire(form: any) {
    this.questionnaire = form;
    this.stage = 3;
    this.signUp()
  }


  signUp() {
    this.authService.signUp(this.initialForm.email, this.initialForm.password, this.initialForm.firstName + " " + this.initialForm.lastName)
    .then(()=>{
      //success
      /*if (this.dna) {
        this.resolveAndUpdateDnaData();
      }*/
    })
    .catch((error)=>{
      this.errorSignupMessage = error;
    });
  }

  navigateToPrivateArea(){
    this.resetStage();
    setTimeout(()=>{
      this.router.navigate(['user', 'strain-browser']);
    }, 300);

  }

  startOver(){
    this.resetStage();
  }

}
