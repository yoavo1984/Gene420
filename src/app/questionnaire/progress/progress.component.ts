import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gene420-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  public stages; //TODO: should become @Input
  public icons;
  public currentStage = 0;


  constructor() {
    this.icons = {
      pending: {
        className: "fa fa-times-circle fa-3x",
        color: "grey"
      },
      done: {
        className: "fa fa-check-circle fa-3x",
        color: "green"
      }
    };

    this.stages = [
      "Personal",
      "Health",
      "Preferences"
    ];
  }

  ngOnInit() {
  }

  nextStage() {
    this.currentStage = this.currentStage + 1;
  };

  getStageIconClassName(stage: number): string {
    if (stage < this.currentStage) {
      return this.icons.done.className;
    }
    else {
      return this.icons.pending.className;
    }
  }

  getStageIconColor(stage: number): string {
    if (stage < this.currentStage) {
      return this.icons.done.color;
    }
    else {
      return this.icons.pending.color;
    }
  }

  isCompleted(){
    return this.currentStage>=this.stages.length;
  }


}
