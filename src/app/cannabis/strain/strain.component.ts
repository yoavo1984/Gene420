import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'gene420-strain',
  templateUrl: './strain.component.html',
  styleUrls: ['./strain.component.css']
})
export class StrainComponent implements OnInit {

  @Input() name;
  @Input() imageUrl;
  @Input() thc;
  @Input() strainType;
  @Output() onReview = new EventEmitter<any>();

  private dnaMatchComputed:boolean;
  private ratingComputed:boolean;
  private dnaMatch;
  private rating;

  constructor() { }

  ngOnInit() {
  }

  computeDnaMatch(){
   return Math.round(Math.min(100,Math.random()*100+30));
  }

  computeRating(){
    return Math.random()*4;
  }

  getDnaMatch(){
    if (!this.dnaMatchComputed){
      this.dnaMatch = this.computeDnaMatch();
      this.dnaMatchComputed = true;
    }
    return this.dnaMatch;
  }

  getRating(){
    if (!this.ratingComputed){
      this.rating = this.computeRating();
      this.ratingComputed = true;
    }
    return this.rating;

  }

  review(){
    this.onReview.emit({name:this.name, imageUrl:this.imageUrl});
  }

}
