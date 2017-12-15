import { Component, OnInit } from '@angular/core';
import {StrainDaoService} from "../../cannabis/services/strain-dao.service";

@Component({
  selector: 'gene420-strain-browser',
  templateUrl: './strain-browser.component.html',
  styleUrls: ['./strain-browser.component.css']
})
export class StrainBrowserComponent implements OnInit {
  private strains;

  constructor(private strainDao:StrainDaoService) { }

  ngOnInit() {
    this.strains = this.strainDao.getAllStrains();;
  }

}
