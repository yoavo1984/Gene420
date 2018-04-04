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
  private countryList;
  @ViewChild ('submitModal') submitModal:SubmitModalComponent;
  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    this.initializeBetaTesterInformation();
  }


  initializeBetaTesterInformation(){
    this.betaTesterInformation = {name: "", email:"", age:"", country:"", smokingExperience:"", city: "", cannabisExperience:"", cannabisPurpose: ""};
  }

  onBetaTestingSubmit() {
    this.submitted = true;
    let success = this.contactService.signupForBetaTesting(
      this.betaTesterInformation.name,
      this.betaTesterInformation.email,
      this.betaTesterInformation.age,
      this.betaTesterInformation.country,
      this.betaTesterInformation.cannabisExperience,
      this.betaTesterInformation.cannabisPurpose


    );
    this.submitModal.open(success);
    success.then(()=>{
      this.betaTesterInformation = {};
    })
  }

}
