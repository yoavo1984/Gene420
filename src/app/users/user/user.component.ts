import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../../authentication/services/auth-service";
import {UserDaoService} from "../services/user-dao.service";
import {Router} from "@angular/router";
import {PHENOTYPE_NAMES} from "../model/Genetics";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'gene420-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild("baseChart") chart: BaseChartDirective;
  private uid;
  private user;

  public email= "";
  public displayName = "";
  public photoUrl="";
  private currentStrainView;
  private loggedIn:boolean = false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = PHENOTYPE_NAMES;
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], label: 'Phenotypes'}
  ];

  constructor(private authService:AuthService, private usersDao:UserDaoService, private router:Router, private ref: ChangeDetectorRef) {
    this.fetchUserDetails();
  }

  ngOnInit() {
    this.reloadChart();


  }

  getGenetics(){
    this.usersDao.getGenetics(this.authService.getCurrentUserUid());
  }


  getIsCurrentStrainView(strainViewName){
    if (strainViewName == this.currentStrainView){
      return true;
    }
  }

  fetchUserDetails(){
    this.authService.onAuthStateChange().then((user)=>{
      this.displayName = user.displayName;
      this.photoUrl = user.photoUrl;
      this.email = user.email;
      this.uid = user.uid;
      this.fetchGenetics(this.uid);
    })
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  fetchGenetics(uid) {
    let genetics = this.usersDao.getGenetics(uid);
    genetics.subscribe((geneticData)=> {
      // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
      let phenotypesDataSeries = {data:[], label: 'Phenotypes'};
      for (let phenotype in geneticData) {
        phenotypesDataSeries.data.push(geneticData[phenotype]);
      }
      this.barChartData[0]=JSON.parse(JSON.stringify(phenotypesDataSeries));
      this.reloadChart();
    });
  }

  reloadChart() {
    if (this.chart !== undefined && this.chart.chart!==undefined) {
      this.chart.chart.destroy();
      this.chart.chart = 0;

      this.chart.datasets = this.barChartData;
      this.chart.labels = this.barChartLabels;
      this.chart.ngOnInit();
    }
  }

}
