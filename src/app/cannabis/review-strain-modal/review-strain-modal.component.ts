import {Component, OnInit, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'gene420-review-strain-modal',
  templateUrl: './review-strain-modal.component.html',
  styleUrls: ['./review-strain-modal.component.css']
})
export class ReviewStrainModalComponent implements OnInit {

  private name;
  private imageUrl;
  @ViewChild ('reviewStrainModal') reviewStrainModal;

  private rating = 4.44;

  constructor() { }

  ngOnInit() {
  }

  open(name, imageUrl){
    this.name = name;
    this.imageUrl = imageUrl;
    this.reviewStrainModal.open();
  }

}
