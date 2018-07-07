import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-personal-questionnaire',
  templateUrl: './personal-questionnaire.component.html',
  styleUrls: ['./personal-questionnaire.component.css']
})
export class PersonalQuestionnaireComponent implements OnInit {

  @Input() shouldShow;

  constructor() { }

  ngOnInit() {
  }

}
