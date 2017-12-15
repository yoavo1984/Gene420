import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gene420-strain',
  templateUrl: './strain.component.html',
  styleUrls: ['./strain.component.css']
})
export class StrainComponent implements OnInit {

  constructor() { }

  @Input() name;
  @Input() imageUrl;
  @Input() ocpc;
  @Input() seedCompany;

  ngOnInit() {
  }

}
