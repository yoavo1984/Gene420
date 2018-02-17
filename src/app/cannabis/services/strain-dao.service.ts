import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {EventBusService} from "../../services/event-bus.service";

@Injectable()
export class StrainDaoService {

  private strains;
  private loaded = false;

  constructor(private angularFire: AngularFireDatabase, private eventBus:EventBusService) {
    this.getAllStrains().subscribe((strains)=>{
      //TODO: a callback is much better here
      this.eventBus.publish("StrainsLoaded");
      this.loaded = true;
      this.strains = strains;
    })
  }

  getAllStrains(){
    return this.angularFire.list('/strains/').valueChanges();
  }

  getStrainsFromToIndex(start:number, end:number){
    return this.angularFire.list('/strains/',ref => ref.startAt(start).endAt(end)).valueChanges();
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

  public getStrainGenetics(name:string):number[]{
    return [
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3),
      Math.floor(Math.random()*3)
    ];
  }

}
