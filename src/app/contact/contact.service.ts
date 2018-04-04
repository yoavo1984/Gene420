import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ContactService {

  constructor(private angularFire: AngularFireDatabase) {

  }

  submitMessage(name, email, message){
    let messages = this.angularFire.list('messages');
    return messages.push({name:name, email:email, message:message});
  }

  signupForBetaTesting(name, email, age, country, zipCode, experience, purpose){
    let betaTesters = this.angularFire.list('betaTesters');
    return betaTesters.push({name:name, email:email, age:age,
      country:country, zipCode:zipCode, cannabisExperience:experience, cannabisPurpose: purpose});
  }

}
