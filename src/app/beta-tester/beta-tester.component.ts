import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from "../contact/contact.service";
import {SubmitModalComponent} from "../contact/submit-modal/submit-modal.component";

@Component({
  selector: 'gene420-beta-tester',
  templateUrl: './beta-tester.component.html',
  styleUrls: ['./beta-tester.component.css']
})
export class BetaTesterComponent implements OnInit {

  betaTesterInformation;
  private submitted;
  @ViewChild ('submitModal') submitModal:SubmitModalComponent;
  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.initializeBetaTesterInformation();
  }


  initializeBetaTesterInformation(){
    this.betaTesterInformation = {name: "", email:"", age:"", country:"", smokingExperience:""};
  }

  onBetaTestingSubmit() {
    this.submitted = true;
    let success = this.contactService.submitMessage(
      this.betaTesterInformation.name,
      this.betaTesterInformation.email,
      this.betaTesterInformation.age
    );
    this.submitModal.open(success);
    success.then(()=>{
      this.betaTesterInformation();
    })
  }

}
