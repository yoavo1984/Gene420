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
  @ViewChild('geneticsModal') geneticsModal;
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
      setTimeout(()=>{
        let matches = [];
        let i=0;
        for (let strain of strains){
          if (strain.show){

            let match = this.matchService.calculateMatchOfStrain(strain);
            matches[i] = match;
            i++;
          }
        }
        matches.sort((a,b)=>{return a-b});
        let min = matches[0];
        for (let i=0; i<matches.length; i++){
          if (min<0){
            matches[i] = matches[i] + Math.abs(min)
          }
          else {
            matches[i] = matches[i] - min;
          }
        }
        for (let strain of strains){
          if (!strain.show){
            continue;
          }
          let match = this.matchService.calculateMatchOfStrain(strain);
          if (min<0){
            match = match + Math.abs(min);
          }
          else {
            match = match - min;
          }

          match =(match*100)/matches[matches.length-1];
          strain.match = match;
        }

      }, 3000);
      this.strains = strains;
      this.allStrains = strains;
      this.loaded = true;
      this.applyFilter();
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

  dnaInfoStrain(event){
    this.geneticsModal.open(event.name);
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
