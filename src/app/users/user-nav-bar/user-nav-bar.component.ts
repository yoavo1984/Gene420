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

  private currentName = "";

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
      if (strain && this.currentName!=data.name){
        this.genetics.addStrainData(this.strainDao.getStrainGenetics(data.name));
        this.currentName = data.name;
      }
    });

    this.eventBus.subscribe("StrainHoverEnded", (data)=>{
      this.genetics.resetToUserData();
    });

  }

  getIsCurrentStrainView(currentStrainView:string){
    if (this.currentStrainView == currentStrainView){
      return true;
    }
  }

  getDnaMatch(){
    return Math.round(Math.min(100,Math.random()*100+30));
  }

  logout(){
    this.router.navigateByUrl('/home');
    return this.authService.logout();
  }


}
