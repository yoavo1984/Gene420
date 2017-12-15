import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  @Input() currentStrainView:string;

  constructor() { }

  ngOnInit() {
  }

  getIsCurrentStrainView(currentStrainView:string){
    if (this.currentStrainView == currentStrainView){
      return true;
    }
  }

}
