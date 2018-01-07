import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";
import {EventBusService} from "../../services/event-bus.service";

@Component({
  selector: 'gene420-strain-browser',
  templateUrl: './strain-browser.component.html',
  styleUrls: ['./strain-browser.component.css']
})
export class StrainBrowserComponent implements OnInit {
  private strains;
  @Input() navigation;
  @ViewChild('reviewStrainModal') reviewStrainModal;

  constructor(private strainDao:StrainDaoService, private eventBus:EventBusService) { }

  ngOnInit() {
    this.strains = this.strainDao.getAllStrains();
  }

  reviewStrain(event){
    this.reviewStrainModal.open(event.name, event.imageUrl);
  }

  strainHovered(data){
    this.eventBus.publish("StrainHovered", {name:data.name});
  }

}
