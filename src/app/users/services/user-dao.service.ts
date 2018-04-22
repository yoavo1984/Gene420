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
        "creative": genetics.creative,
        "funny": genetics.funny,
        "energetic": genetics.energetic,
        "desire": genetics.desire,
        "stimulation": genetics.stimulation,
        "anxious": genetics.anxious,
        "paranoia": genetics.paranoia,
        "obesity": genetics.obesity,
        "narcolapsy": genetics.narcolapsy,
        "pain": genetics.pain,
        "dependence": genetics.dependence
      }
    )

  }

}
