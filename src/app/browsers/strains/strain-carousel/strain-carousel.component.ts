import {Component, OnInit, ViewChild} from '@angular/core';
import {StrainDaoService} from "../../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-strain-carousel',
  templateUrl: './strain-carousel.component.html',
  styleUrls: ['./strain-carousel.component.css']
})
export class StrainCarouselComponent implements OnInit {

  private strains;
  constructor(private strainDaoService:StrainDaoService) { }

  ngOnInit() {
    this.strains = this.strainDaoService.getAllStrains();
  }

}
