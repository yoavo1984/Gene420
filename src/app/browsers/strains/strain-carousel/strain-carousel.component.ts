import {Component, OnInit, ViewChild} from '@angular/core';
import {CarouselComponent} from "angular2-carousel";
import {StrainDaoService} from "../../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-strain-carousel',
  templateUrl: './strain-carousel.component.html',
  styleUrls: ['./strain-carousel.component.css']
})
export class StrainCarouselComponent implements OnInit {

  private strains;
  @ViewChild('carousel') carousel: CarouselComponent;
  constructor(private strainDaoService:StrainDaoService) { }

  ngOnInit() {
    this.strains = this.strainDaoService.getAllStrains();
  }

}
