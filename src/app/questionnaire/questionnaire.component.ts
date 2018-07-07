import {Component, OnInit, ViewChild} from '@angular/core';
import {HealthQuestionnaireComponent} from "./health-questionnaire/health-questionnaire.component";
import {PersonalQuestionnaireComponent} from "./personal-questionnaire/personal-questionnaire.component";

@Component({
  selector: 'gene420-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  public stages = 3;
  public currentStage = 0;

  constructor() { }

  ngOnInit() {

  }

  nextStage(){
    this.currentStage = this.currentStage +1;
  }

}
