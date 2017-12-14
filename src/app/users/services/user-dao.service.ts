import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserDaoService {

  constructor(private angularFire: AngularFireDatabase) { }

  getUser(uid){
    return this.angularFire.object('/users/'+uid);
  }

}
