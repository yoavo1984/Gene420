import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class StrainDaoService {

  constructor(private angularFire: AngularFireDatabase) {

  }

  getAllStrains(){
    return this.angularFire.list('/strains/').valueChanges();
  }

  getStrainAtIndex(index){
    return this.angularFire.list('/strains/',ref => ref.startAt(index).endAt(index)).valueChanges();
  }

}
