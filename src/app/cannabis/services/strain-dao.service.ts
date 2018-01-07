import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class StrainDaoService {

  private strains;
  private loaded = false;

  constructor(private angularFire: AngularFireDatabase) {
    this.getAllStrains().subscribe((strains)=>{
      this.loaded = true;
      this.strains = strains;
    })
  }

  getAllStrains(){
    return this.angularFire.list('/strains/').valueChanges();
  }

  getStrainAtIndex(index:number){
    return this.angularFire.list('/strains/',ref => ref.startAt(index).endAt(index)).valueChanges();
  }

  public getStrainByName(name:string){
    if (!this.loaded) {
      return;
    }
    for (let strain of this.strains){
      if (strain.name == name){
        return strain;
      }
    }
  }

}
