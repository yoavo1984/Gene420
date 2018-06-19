import {Component, OnInit, Input, SimpleChanges, ViewChild} from '@angular/core';
import {UserDaoService} from "../services/user-dao.service";
import {AuthService} from "../../authentication/services/auth-service";
import {BaseChartDirective} from "ng2-charts";
import {Router} from "@angular/router";
import {MatcherService} from "../../cannabis/services/matcher.service";
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-genetics',
  templateUrl: './genetics.component.html',
  styleUrls: ['./genetics.component.css']
})
export class GeneticsComponent implements OnInit {

  @Input() user;
  @ViewChild("baseChart") chart: BaseChartDirective;
  private baseGeneticChartLabels;
  constructor(private userDao:UserDaoService,
              private authService:AuthService,
              private router:Router,
              private matcherService:MatcherService,
              private strainDao:StrainDaoService) { }

  ngOnInit() {
    //TODO: check how to unify this to all user related components
    if (!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/home');
      return;
    }
    this.setupUserGenetics();
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

  public geneticsChartOptions:any = {
    scale: {
      ticks: {
        suggestedMin: 0,
        display:false,
        //showLabelBackdrop: false
      }
    },
    maintainAspectRatio: false,
    responsive: true

  };


  public geneticsChartLabels:any[] = [];
  public geneticsChartType:string = 'radar';
  public geneticsChartLegend:boolean = false;

  public geneticsChartData:any[] = [
    {data: [1, 2, 3, 4, 5], label: 'series1'}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  setupUserGenetics():void{
    let geneticArray = [];
    let genetics = this.userDao.getGenetics(this.authService.getCurrentUserUid());
    genetics.subscribe((geneticData)=>{
      this.geneticsChartLabels = [];
      for (let phenotype in geneticData){
        let power = parseInt(geneticData[phenotype]);
        if (power>0){
          geneticArray.push(power);
          this.geneticsChartLabels.push(phenotype);
        }
      }
      this.geneticsChartData = JSON.parse(JSON.stringify([{data:geneticArray, label:''}]));
      this.baseGeneticChartLabels = JSON.parse(JSON.stringify(this.geneticsChartLabels));
      this.reloadChart();
    });
  }

  addStrainEffectsData(strainName:string){
      let effectData = [];
      let strain = this.strainDao.getStrainByName(strainName);
      if (!strain){
        return; //error -was not loaded
      }
      for (let i=0; i<this.baseGeneticChartLabels.length; i++){
        let phenotype = this.baseGeneticChartLabels[i];
        let effectTuple = this.matcherService.getMostAffectingNegativeEffectForPhenotype(strain, phenotype);
        effectData.push(effectTuple);
        this.geneticsChartLabels[i] = this.baseGeneticChartLabels[i]+ " "+effectTuple["effect"];

      }
      let dataArray = [];

      for (let i=0; i<effectData.length; i++){
        dataArray.push(Math.abs(Math.round(effectData[i]["value"]/100)));
      }
      this.addStrainData(dataArray);

  }

  addStrainData(data:number[]){
    let newData = [this.geneticsChartData[0], {data:data}];
    this.geneticsChartData = JSON.parse(JSON.stringify(newData));
    this.reloadChart();
  }

  resetToUserData(){
    this.geneticsChartData = JSON.parse(JSON.stringify([{data: this.geneticsChartData[0].data, label:''}]));
    this.reloadChart();
  }

}
