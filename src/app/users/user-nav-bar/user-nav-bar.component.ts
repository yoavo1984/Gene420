import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/services/auth-service";

@Component({
  selector: 'gene420-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  @Input() currentStrainView:string;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
  }

  getIsCurrentStrainView(currentStrainView:string){
    if (this.currentStrainView == currentStrainView){
      return true;
    }
  }

  logout(){
    this.router.navigateByUrl('/home');
    return this.authService.logout();
  }


}
