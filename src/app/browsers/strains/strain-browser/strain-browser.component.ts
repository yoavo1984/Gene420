import {
  Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener,
  ChangeDetectorRef
} from '@angular/core';
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
  public loaded = false;
  private shouldShowFilterPane = true;
  private innerWidth;
  private strainsRemote;
  private allStrains = [];

  //filtering
  public strainType = "All";
  public thc = "All";
  public useObjective = "All";
  public useObjectiveTrashold = 70;


  constructor(private strainDao: StrainDaoService,
              private eventBus: EventBusService,
              private matchService: MatcherService,
              private changeDetector: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.strainsRemote = this.strainDao.getAllStrains();
    this.strainsRemote.subscribe((strains)=> {
      if (this.loaded) {
        return;
      }
      setTimeout(()=> {
        let matches = [];
        let i = 0;
        for (let strain of strains) {
          if (strain.show) {

            let match = this.matchService.resolvePoints(strain);
            matches[i] = match;
            i++;
          }
        }
        matches.sort((a, b)=> {
          return a - b
        });
        let min = matches[0];
        for (let i = 0; i < matches.length; i++) {
          if (min < 0) {
            matches[i] = matches[i] + Math.abs(min)
          }
          else {
            matches[i] = matches[i] - min;
          }
        }
        for (let strain of strains) {
          if (!strain.show) {
            continue;
          }
          let match = this.matchService.resolvePoints(strain);
          if (min < 0) {
            match = match + Math.abs(min);
          }
          else {
            match = match - min;
          }

          match = (match * 100) / matches[matches.length - 1];
          strain.match = Math.round(match);
        }
        this.changeDetector.detectChanges();
        this.applyFilter();

      }, 3000);
      this.strains = strains;
      this.allStrains = strains;
      this.loaded = true;
      this.applyFilter();
    });

    this.innerWidth = window.innerWidth;

  }

  hasStrain(strainToAdd, strains) {
    for (let strain of strains) {
      if (strain['name'] == strainToAdd['name']) {
        return true;
      }
    }
    return false;
  }

  removeStrain(strainToRemove, strains) {
    let removeIndexes = [];
    for (let i = 0; i < strains.length; i++) {
      let strain = strains[i];
      if (strain['name'] == strainToRemove['name']) {
        removeIndexes.push(i);
      }
    }
    strains.splice(removeIndexes, 1)
  }

  addStrain(strainToAdd, strains) {
    if (!this.hasStrain(strainToAdd, strains)) {
      strains.push(strainToAdd);
    }
  }

  //TODO: implement filters
  applyFilter() {
    let strains = JSON.parse(JSON.stringify(this.allStrains));
    strains = this.showFilter(strains);
    strains = this.typeFilter(strains);
    strains = this.objectiveFilter(strains);
    this.strains = JSON.parse(JSON.stringify(strains));
    this.changeDetector.detectChanges();
  }

  showFilter(strains) {
    let newStrains = [];
    for (let strain of strains) {
      if (strain['show']) {
        this.addStrain(strain, newStrains);
      }
    }
    return newStrains;
  }

  typeFilter(strains) {
    let newStrains = [];
    if (this.strainType == "All") {
      return strains;

    }
    for (let strain of strains) {
      if (strain['type'] == this.strainType) {
        this.addStrain(strain, newStrains);
      }
    }
    return newStrains;
  }

  resolveObjectiveFilterEffect() {
    switch (this.useObjective) {
      case 'Pain Relief':
        return 'Pain';
      case 'Insomnia':
        return 'Insomnia';
      case 'Stress Reduction':
        return 'Stress';
      case 'Anti Depressive':
        return 'Depression';
      default:
        return 'Pain'
    }
  }

  objectiveFilter(strains) {
    let newStrains = [];
    if (this.useObjective == "All") {
      return strains;

    }
    let effectName = this.resolveObjectiveFilterEffect();
    for (let strain of strains) {
      if (strain['effects'][effectName] >= this.useObjectiveTrashold) {
        this.addStrain(strain, newStrains);
      }
    }
    return newStrains;
  }


  reset() {
    let strains = JSON.parse(JSON.stringify(this.allStrains));
    strains = this.showFilter(strains);
    this.strains = strains;
  }


  reviewStrain(event) {
    this.reviewStrainModal.open(event.name, event.imageUrl);
  }

  dnaInfoStrain(event) {
    this.geneticsModal.open(event.name);
  }

  strainHovered(data) {
    this.eventBus.publish("StrainHovered", {name: data.name});
  }

  strainHoverEnded(data) {
    this.eventBus.publish("StrainHoverEnded", {name: data.name});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1500) {
      this.shouldShowFilterPane = false;
    }
    else {
      this.shouldShowFilterPane = true;
    }
  }


}
