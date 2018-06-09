import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Genetics} from "../model/Genetics";
import {AuthService} from "../../authentication/services/auth-service";

@Injectable()
export class UserDaoService {
  public genetics;

  constructor(private angularFire: AngularFireDatabase) {
  }

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
        "creative": genetics.creative || 0,
        "funny": genetics.funny || 0,
        "energetic": genetics.energetic || 0,
        "desire": genetics.desire || 0,
        "stimulation": genetics.stimulation|| 0,
        "anxious": genetics.anxious || 0,
        "paranoia": genetics.paranoia || 0,
        "obesity": genetics.obesity || 0,
        "narcolepsy": genetics.narcolepsy || 0,
        "pain": genetics.pain || 0,
        "dependence": genetics.dependence || 0
      }
    )

  }

}
