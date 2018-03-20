import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from "../contact/contact.service";
import {SubmitModalComponent} from "../contact/submit-modal/submit-modal.component";

@Component({
  selector: 'gene420-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getInTouchInformation;

  submitted = false;

  @ViewChild ('submitModal') submitModal:SubmitModalComponent;

  constructor(private contactService:ContactService) { }

  onSubmit() {
    this.submitted = true;
    let success = this.contactService.submitMessage(
      this.getInTouchInformation.name,
      this.getInTouchInformation.email,
      this.getInTouchInformation.message
    );
    this.submitModal.open(success);
    success.then(()=>{
      this.initializeGetInTouchInformation();
    })
  }



  ngOnInit() {
    this.initializeGetInTouchInformation();
  }

  initializeGetInTouchInformation(){
    this.getInTouchInformation = {name: "", email:"", message:""};
  }

}
