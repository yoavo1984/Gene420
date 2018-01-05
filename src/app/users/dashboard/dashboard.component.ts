import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../authentication/services/auth-service";
import {UserDaoService} from "../services/user-dao.service";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private uid;
  private user;

  private email;
  private displayName;
  private photoUrl;
  private currentStrainView;

  constructor(private authService:AuthService, private usersDao:UserDaoService, private router:Router) { }

  ngOnInit() {
    if (!this.authService.getCurrentUser()){
      this.router.navigateByUrl('/home')
    }
    this.currentStrainView = "browse-strains";
    this.uid = this.authService.getCurrentUserUid();
    this.user = this.usersDao.getUser(this.uid);
    this.email = this.authService.getCurrentUserEmail();
    this.displayName = this.authService.getCurrentUserDisplayName();
    this.photoUrl = this.authService.getCurrentUserPhotoUrl();
  }

  getIsCurrentStrainView(strainViewName){
    if (strainViewName == this.currentStrainView){
      return true;
    }
  }

}
