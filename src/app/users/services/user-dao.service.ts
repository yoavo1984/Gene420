import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

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

interface Genetics{
  craving:number;
  psychosis:number;
  memory:number;
  dependence:number;
  decision:number;
}
