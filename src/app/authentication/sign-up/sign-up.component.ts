import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'gene420-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private form;
  private stage: number = 0;
  private questionnaire;
  private dna;
  //1 - initial form, 2 - DNA, 3 - Questionnaire


  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  submitInitialForm(form: any) {
    this.form = form;
    this.stage = 1;
  }

  submitDNA(dnaData) {
    this.dna = dnaData;
    this.stage = 2;
  }

  submitQuestionnaire(form:any){
    this.questionnaire = form;
    this.stage = 3;
  }


  signUp(form: any) {
    this.authService.signUp(form.email, form.password, form.firstName + " " + form.lastName);

  }

}
