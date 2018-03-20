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

}
