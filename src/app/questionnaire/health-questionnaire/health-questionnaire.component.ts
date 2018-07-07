import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-health-questionnaire',
  templateUrl: './health-questionnaire.component.html',
  styleUrls: ['./health-questionnaire.component.css']
})
export class HealthQuestionnaireComponent implements OnInit {

  @Input() shouldShow;

  constructor() { }

  ngOnInit() {
  }

}
