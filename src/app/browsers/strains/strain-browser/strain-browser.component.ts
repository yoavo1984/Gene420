import {Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {StrainDaoService} from "../../../cannabis/services/strain-dao.service";
import {EventBusService} from "../../../services/event-bus.service";
import {MatcherService} from "../../../cannabis/services/matcher.service";

@Component({
  selector: 'gene420-strain-browser',
  templateUrl: './strain-browser.component.html',
  styleUrls: ['./strain-browser.component.css']
})
export class StrainBrowserComponent implements OnInit {
  private strains = [];
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


  constructor(private strainDao:StrainDaoService, private eventBus:EventBusService, private matchService:MatcherService) { }


  ngOnInit() {
    this.strainsRemote = this.strainDao.getAllStrains();
    this.strainsRemote.subscribe((strains)=>{
      if (this.loaded){
        return;
      }
      this.strains = strains;
      this.allStrains = strains;
      this.loaded = true;
      this.applyFilter();
      setTimeout(()=>{
        for (let strain of strains){
          if (strain.show){
            let match = this.matchService.calculateMatchOfStrain(strain);
            let a = 1;
          }
        }
      }, 3000);

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
      for (let strain of this.allStrains){
        if (strain["show"]){
          strains.push(strain);
        }
      }
      return strains;

    }
    for (let strain of this.allStrains){
      if (strain['type'] == this.strainType && strain['show']){
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
