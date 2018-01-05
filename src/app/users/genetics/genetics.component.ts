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

  public barChartOptions:any = {
    scale: {
      ticks: {
        display:false,
        //showLabelBackdrop: false
      }

    },
    responsive: true
  };
  public barChartLabels:any[] = ["Craving", 'Psychosis', 'Memory', 'Dependence', 'Decision'];
  public barChartType:string = 'radar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [2, 3, 5, 0, 3,], label: ''},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}

/**
yAxes: [{
  ticks: {
    fontFamily: 'FontAwesome'
    //beginAtZero: true,
    //maxTicksLimit: 5,
    // Create scientific notation labels
    /callback: function(value, index, values) {
     return value + ' €';
     }
  }
}],
  xAxes: [{
  //categoryPercentage: 1.0,
  //barPercentage: 0.6,
  ticks: {
    callback: function(value, index, values) {
      return '';
    }
  }


}]*/
