import {Component, OnInit, Input, SimpleChanges, ViewChild} from '@angular/core';
import {UserDaoService} from "../services/user-dao.service";
import {AuthService} from "../../authentication/services/auth-service";
import {Genetics} from "../model/Genetics";
import {BaseChartDirective} from "ng2-charts";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-genetics',
  templateUrl: './genetics.component.html',
  styleUrls: ['./genetics.component.css']
})
export class GeneticsComponent implements OnInit {

  @Input() user;
  @ViewChild("baseChart") chart: BaseChartDirective;
  private iconByPhenotype = {
    "craving": "fa fa-birthday-cake",
    "psychosis": "fa fa-bullseye",
    "memory": "fa fa-floppy-o",
    "dependence": "fa fa-heart",
    "decision": "fa fa-lightbulb-o"
  };
  private initFlag;
  constructor(private userDao:UserDaoService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    //TODO: check how to unify this to all user related components
    if (!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/home');
      return;
    }
    this.getUserGenetics();
    this.reloadChart();
  }

  reloadChart() {
    if (this.chart !== undefined && this.chart.chart!==undefined) {
      this.chart.chart.destroy();
      this.chart.chart = 0;

      this.chart.datasets = this.geneticsChartData;
      this.chart.labels = this.geneticsChartLabels;
      this.chart.ngOnInit();
    }
  }

  getIconClass(phenotype){
    return this.iconByPhenotype[phenotype] +' fa-3x';
  }

  public geneticsChartOptions:any = {
    scale: {
      ticks: {
        display:false,
        //showLabelBackdrop: false
      }

    },
    responsive: true
  };
  public geneticsChartLabels:any[] = ["Craving", 'Decision', 'Dependence', 'Memory', 'Psychosis'];
  public geneticsChartType:string = 'radar';
  public geneticsChartLegend:boolean = false;

  public geneticsChartData:any[] = [
    {data: [0, 0, 0, 0, 0], label: ''}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  getUserGenetics():void{
    let geneticArray = [];
    let genetics = this.userDao.getGenetics(this.authService.getCurrentUserUid());
    genetics.subscribe((geneticData)=>{
      for (let phenotype in geneticData){
        geneticArray.push(geneticData[phenotype]);
      }
      this.geneticsChartData = JSON.parse(JSON.stringify([{data:geneticArray}]));
    });
  }

  addStrainData(data:number[]){
    let newData = [this.geneticsChartData[0], {data:data}];
    this.geneticsChartData = JSON.parse(JSON.stringify(newData));
    this.reloadChart();
  }

  resetToUserData(){
    this.geneticsChartData = JSON.parse(JSON.stringify([{data: this.geneticsChartData[0].data}]));
    this.reloadChart();
  }

}
