import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Phenome} from "../model/Phenome";
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

  updateUserPhenome(uid, phenome:Phenome){
    let remotePhenome = this.angularFire.object('/users/'+uid+'/genetics/');
    remotePhenome.update(
      {
        "creative": phenome.creative || 0,
        "funny": phenome.funny || 0,
        "energetic": phenome.energetic || 0,
        "desire": phenome.desire || 0,
        "stimulation": phenome.stimulation|| 0,
        "anxious": phenome.anxious || 0,
        "paranoia": phenome.paranoia || 0,
        "obesity": phenome.obesity || 0,
        "narcolepsy": phenome.narcolepsy || 0,
        "pain": phenome.pain || 0,
        "dependence": phenome.dependence || 0
      }
    )

  }

}
