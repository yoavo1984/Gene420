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

  private email;
  private displayName;
  private photoUrl;
  private currentStrainView;

  constructor(private authService:AuthService, private usersDao:UserDaoService, private router:Router) { }

  ngOnInit() {

  }

  getIsCurrentStrainView(strainViewName){
    if (strainViewName == this.currentStrainView){
      return true;
    }
  }

}
