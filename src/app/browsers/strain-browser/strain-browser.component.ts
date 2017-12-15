import {Component, OnInit, ViewChild} from '@angular/core';
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-strain-browser',
  templateUrl: './strain-browser.component.html',
  styleUrls: ['./strain-browser.component.css']
})
export class StrainBrowserComponent implements OnInit {
  private strains;
  @ViewChild('reviewStrainModal') reviewStrainModal;

  constructor(private strainDao:StrainDaoService) { }

  ngOnInit() {
    this.strains = this.strainDao.getAllStrains();
  }

  reviewStrain(event){
    this.reviewStrainModal.open(event.name, event.imageUrl);
  }

}
