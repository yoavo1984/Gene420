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

  private email= "";
  private displayName = "";
  private photoUrl="";
  private currentStrainView;
  private loggedIn:boolean = false;
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

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
      this.fetchGenetics(uid);
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
  }

}
