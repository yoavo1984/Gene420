import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../authentication/services/auth-service";
import {UserDaoService} from "../services/user-dao.service";

@Component({
  selector: 'gene420-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private uid;
  private user;

  private iconByPhenotype = {
    "craving": "fa fa-birthday-cake",
    "psychosis": "fa fa-bullseye",
    "memory": "fa fa-floppy-o",
    "dependence": "fa fa-heart",
    "decision": "fa fa-lightbulb-o"
  };
  private email;
  private displayName;
  private photoUrl;

  constructor(private authService:AuthService, private usersDao:UserDaoService) { }



  ngOnInit() {
    this.uid = this.authService.getCurrentUserUid();
    this.user = this.usersDao.getUser(this.uid).valueChanges();
    this.email = this.authService.getCurrentUserEmail();
    this.displayName = this.authService.getCurrentUserDisplayName();
    this.photoUrl = this.authService.getCurrentUserPhotoUrl();
  }

  getIconClass(phenotype){
    return this.iconByPhenotype[phenotype] +' fa-3x';
  }

}
