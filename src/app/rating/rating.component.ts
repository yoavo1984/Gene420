import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() stars;

  private MAX_STARS:number = 4;
  private filledStars;
  private emptyStars;
  private hasHalfStars;




  constructor() { }

  ngOnInit() {
    if (this.stars>this.MAX_STARS){
      this.stars = this.MAX_STARS;
    }
    if (this.stars - Math.floor(this.stars)>0.5){
      this.hasHalfStars = true;
    }

    this.filledStars = this.getRange(Math.floor(this.stars));
    this.emptyStars = this.getRange(this.MAX_STARS-Math.floor(this.stars));
    if (!this.hasHalfStars){
      this.emptyStars+1;
    }
  }

  getRange(length){
    let range = [];
    for (let i=0; i<length; i++){
      range[i] = i;
    }
    return range;

  }

  getStarsCssClass(){

  }

}
