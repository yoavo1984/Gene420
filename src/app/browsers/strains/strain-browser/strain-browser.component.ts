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
  private strainsRemote;
  private allStrains = [];

  //filtering
  private strainType = "All";
  private thc = "All";


  constructor(private strainDao:StrainDaoService, private eventBus:EventBusService) { }


  ngOnInit() {
    this.strainsRemote = this.strainDao.getAllStrains();
    this.strainsRemote.subscribe((strains)=>{
      this.strains = strains;
      this.allStrains = strains;
      this.loaded = true;
    });

    this.innerWidth = window.innerWidth;
  }

  //TODO: implement filters
  applyFilter(){
    this.strains = this.filter();
  }

  filter(){
    let strains = [];
    if (this.strainType == "All"){
      return this.allStrains;
    }
    for (let strain of this.allStrains){
      if (strain['type'] == this.strainType){
        strains.push(strain);
      }
    }
    return strains;
  }


  reset(){
    this.strains = this.allStrains;
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
