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
  @Input() width = 100;
  @Input() height = 80;
  @Input() margin = 2;
  @Input() dnaMatch = 0;

  @Output() onReview = new EventEmitter<any>();
  @Output() onDnaInfo = new EventEmitter<any>();
  @Output() onHover = new EventEmitter<any>();
  @Output() onHoverEnded = new EventEmitter<any>();

  private dnaMatchComputed:boolean;
  private ratingComputed:boolean;
  private rating;
  private currentStrainName;

  constructor() { }

  ngOnInit() {
  }

  computeDnaMatch(){
   return this.dnaMatch;
  }

  computeRating(){
    return Math.random()*5;
  }

  getDnaMatch(){
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

  dnaInfo(){
    this.onDnaInfo.emit({name:this.name});
  }

  mouseEnter(){
    this.currentStrainName = this.name;
    this.onHover.emit({name:this.currentStrainName})
  }

  mouseLeave(){
    this.onHoverEnded.emit({name:this.currentStrainName});
    this.currentStrainName = null;
  }

}
