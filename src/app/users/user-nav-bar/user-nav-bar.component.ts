import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/services/auth-service";
import {EventBusService} from "../../services/event-bus.service";
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  @Input() currentStrainView:string;
  @ViewChild('genetics') genetics;

  constructor(private router:Router,
              private authService:AuthService,
              private eventBus:EventBusService,
              private strainDao:StrainDaoService

  ) { }

  ngOnInit() {
    this.eventBus.subscribe("StrainHovered", (data)=>{
      let strain = this.strainDao.getStrainByName(data.name);
      if (strain){
        //A TEST
        this.genetics.addData([1,0,4,5,2]);
      }
    })
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
