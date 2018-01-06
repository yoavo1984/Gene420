import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Genetics} from "../model/Genetics";

@Injectable()
export class UserDaoService {

  constructor(private angularFire: AngularFireDatabase) { }

  getUser(uid){
    return this.angularFire.object('/users/'+uid).valueChanges();
  }

  getGenetics(uid){
    return this.angularFire.object('/users/'+uid+'/genetics/').valueChanges();
  }

  updateUserGenetics(uid, genetics:Genetics){
    let remoteGenetics = this.angularFire.object('/users/'+uid+'/genetics/');
    remoteGenetics.update(
      {
        "craving": genetics.craving,
        "psychosis": genetics.psychosis,
        "memory": genetics.memory,
        "dependence": genetics.dependence,
        "decision": genetics.decision
      }
    )

  }

}
