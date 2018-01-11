import {Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {StrainDaoService} from "../../../cannabis/services/strain-dao.service";
import {EventBusService} from "../../../services/event-bus.service";

@Component({
  selector: 'gene420-strain-browser',
  templateUrl: './strain-browser.component.html',
  styleUrls: ['./strain-browser.component.css']
})
export class StrainBrowserComponent implements OnInit {
  private strains;
  private showList = false;
  @Input() navigation;
  @ViewChild('reviewStrainModal') reviewStrainModal;
  private loaded = false;
  private shouldShowFilterPane = true;
  private innerWidth;

  constructor(private strainDao:StrainDaoService, private eventBus:EventBusService) { }


  ngOnInit() {
    this.strains = this.strainDao.getAllStrains();
    this.innerWidth = window.innerWidth;
    this.eventBus.subscribe("StrainsLoaded", ()=>{
      //TODO: slow load, just an effect for now
      window.setTimeout(()=>{
        this.loaded = true;
      }, 4000);

    });
  }


  reviewStrain(event){
    this.reviewStrainModal.open(event.name, event.imageUrl);
  }

  strainHovered(data){
    this.eventBus.publish("StrainHovered", {name:data.name});
  }

  strainHoverEnded(data){
    this.eventBus.publish("StrainHoverEnded", {name:data.name});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth<1500){
      this.shouldShowFilterPane = false;
    }
    else {
      this.shouldShowFilterPane = true;
    }
  }


}
