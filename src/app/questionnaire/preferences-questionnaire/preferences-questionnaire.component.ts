import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-preferences-questionnaire',
  templateUrl: './preferences-questionnaire.component.html',
  styleUrls: ['./preferences-questionnaire.component.css']
})
export class PreferencesQuestionnaireComponent implements OnInit {

  @Input() shouldShow;

  constructor() { }

  ngOnInit() {
  }

}
