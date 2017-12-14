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

  constructor(private authService:AuthService, private usersDao:UserDaoService) { }


  ngOnInit() {
    this.uid = this.authService.getCurrentUserUid();
    this.user = this.usersDao.getUser(this.uid).valueChanges();
  }

}
