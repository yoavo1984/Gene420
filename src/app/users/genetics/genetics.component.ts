import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-genetics',
  templateUrl: './genetics.component.html',
  styleUrls: ['./genetics.component.css']
})
export class GeneticsComponent implements OnInit {

  @Input() user;
  private iconByPhenotype = {
    "craving": "fa fa-birthday-cake",
    "psychosis": "fa fa-bullseye",
    "memory": "fa fa-floppy-o",
    "dependence": "fa fa-heart",
    "decision": "fa fa-lightbulb-o"
  };
  constructor() { }

  ngOnInit() {
  }

  getIconClass(phenotype){
    return this.iconByPhenotype[phenotype] +' fa-3x';
  }

}
