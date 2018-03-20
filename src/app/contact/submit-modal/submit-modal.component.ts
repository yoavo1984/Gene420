import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'gene420-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.css']
})
export class SubmitModalComponent implements OnInit {

  message:string = "";
  showSpinner: boolean;
  constructor() { }

  @ViewChild ('submitModal') submitModal;

  ngOnInit() {
  }

  open(successPromise){
    this.message = "Submitting your message...";
    this.showSpinner = true;
    this.submitModal.open();
    successPromise.then(()=>{
      setTimeout(()=>{
        this.onSubmitSuccess();
      }, 2500);
    });
  }

  onSubmitSuccess(){
    this.message = "Successfuly submitted!";
    this.showSpinner = false;
  }

}
