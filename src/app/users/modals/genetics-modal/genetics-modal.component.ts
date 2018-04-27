import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'gene420-genetics-modal',
  templateUrl: './genetics-modal.component.html',
  styleUrls: ['./genetics-modal.component.css']
})
export class GeneticsModalComponent implements OnInit {

  @ViewChild ('geneticsModal') geneticsModal;
  @ViewChild ('genetics') genetics;
  private name;

  constructor() { }

  ngOnInit() {
  }

  open(name){
    this.name = name;
    this.geneticsModal.open();
    this.genetics.reloadChart();
    this.genetics.addStrainEffectsData(name);

  }

}
