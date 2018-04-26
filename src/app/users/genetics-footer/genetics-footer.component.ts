import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";
import {EventBusService} from "../../services/event-bus.service";

@Component({
  selector: 'gene420-genetics-footer',
  templateUrl: './genetics-footer.component.html',
  styleUrls: ['./genetics-footer.component.css']
})
export class GeneticsFooterComponent implements OnInit {

  private currentName = "";
  @Input() currentStrainView:string;
  @ViewChild('genetics') genetics;

  constructor(
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

  getDnaMatch(){
    return 15;
  }

}
