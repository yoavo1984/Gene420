import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'gene420-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signUp(form:any){
    this.authService.signUp(form.email, form.password, form.firstName+" "+form.lastName);

  }

}
