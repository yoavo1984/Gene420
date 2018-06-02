import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../authentication/services/auth-service";
import {UserDaoService} from "../services/user-dao.service";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private authService:AuthService, private usersDao:UserDaoService, private router:Router) {
  }

  ngOnInit() {
    this.fetchUserDetails();


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

  fetchGenetics(uid){
    let genetics = this.usersDao.getGenetics(uid);
    genetics.subscribe((geneticData)=>{
      /*for (let phenotype in geneticData){
        if (!this.userGenetics){
          this.userGenetics = {};
        }
        this.userGenetics[phenotype] = geneticData[phenotype];
      }
      this.userGeneticsReady = true;
    });*/
    });
  }

}
