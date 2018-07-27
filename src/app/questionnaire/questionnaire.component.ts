import {Component, OnInit, ViewChild} from '@angular/core';
import {HealthQuestionnaireComponent} from "./health-questionnaire/health-questionnaire.component";
import {PersonalQuestionnaireComponent} from "./personal-questionnaire/personal-questionnaire.component";
import {Phenome} from "../users/model/Phenome";

@Component({
  selector: 'gene420-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  public stages = 3;
  public currentStage = 0;
  private questionnaire; //TODO: what is the type of this member??

  constructor() { }

  ngOnInit() {

  }

  nextStage(){
    this.currentStage = this.currentStage +1;
  }

  resolvePhenotypesDataOfQuestionnaire(){
    let phenotypes:Phenome = {
      "creative":this.questionnaire.insomnia? 1:0,
      "funny": 0,
      "energetic": this.questionnaire.insomnia? 1:0,
      "desire": this.questionnaire.male? 2:0,
      "stimulation": 0,
      "anxious": this.questionnaire.anxiety? 1:0,
      "paranoia": this.questionnaire.depression? 1:0 + this.questionnaire.psychosis? 1:0,
      "obesity": 0,
      "narcolepsy": this.questionnaire.insomnia? -1:0,
      "pain": this.questionnaire.depression? 1:0,
      "dependence": this.questionnaire.depression? 2:0
    };
    return phenotypes;
  }

}
