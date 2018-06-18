import { Injectable } from '@angular/core';
import {StrainDaoService} from "./strain-dao.service";
import {UserDaoService} from "../../users/services/user-dao.service";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../authentication/services/auth-service";
import {TextUtils} from "../../utils/TextUtils";
import * as firebase from 'firebase/app';

@Injectable()
export class MatcherService {

  private effects;
  private effectsReady:boolean;
  private phenotypes;
  private phenotypesReady:boolean;
  private userGenetics;
  private userGeneticsReady:boolean;

  constructor(private strainDao:StrainDaoService,
              private userDao:UserDaoService,
              private angularFire:AngularFireDatabase,
              private authService:AuthService,
              private userDaoService:UserDaoService) {

    this.loadEffects();
    this.loadPhenotypes();
    this.registerOnAuthStateChange();

  }

  registerOnAuthStateChange(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user /*&& user.emailVerified*/) {
        this.loadGeneticsForCurrentUser();
      }
    });
  }


  loadEffects(){
    let effects = this.angularFire.object('/effects').valueChanges();
    effects.subscribe((effects)=>{
      this.effects = effects;
      this.effectsReady = true;
    })
  }

  loadPhenotypes(){
    let effects = this.angularFire.object('/phenotypes').valueChanges();
    effects.subscribe((phenotypes)=>{
      this.phenotypes = phenotypes;
      this.phenotypesReady = true;
    })
  }

  loadGeneticsForCurrentUser(){
    let genetics = this.userDaoService.getGenetics(this.authService.getCurrentUserUid());
    genetics.subscribe((geneticData)=>{

      for (let phenotype in geneticData){
        if (!this.userGenetics){
          this.userGenetics = {};
        }
        this.userGenetics[phenotype] = geneticData[phenotype];
      }
      this.userGeneticsReady = true;
    });
  }

  //TODO: merge these
  getMostAffectingPositiveEffectForPhenotype(strain, phenotypeName){
    let maxEffect;
    let max = 0;
    let genetics = this.userGenetics;

      let power = genetics[phenotypeName];
      let phenotypeValues = this.phenotypes[TextUtils.capitalizeFirstLetter(phenotypeName)].split(",");
      for (let i=0; i<phenotypeValues.length; i++){
        let value = parseInt(phenotypeValues[i]);
        let effect = this.effects[i].substring(0, this.effects[i].length-3);
        if (strain.effects[effect]){
           if (value<0){
              continue;
           }
           if (value*strain.effects[effect]>max){
              max = value*strain.effects[effect];
              maxEffect= effect;
           }
        }
      }
      return {"value":max, "effect":maxEffect};
  }

  getMostAffectingNegativeEffectForPhenotype(strain, phenotypeName){
    let minEffect;
    let min = 0;
    let genetics = this.userGenetics;

    let power = genetics[phenotypeName];
    let phenotypeValues = this.phenotypes[TextUtils.capitalizeFirstLetter(phenotypeName)].split(",");
    for (let i=0; i<phenotypeValues.length; i++){
      let value = parseInt(phenotypeValues[i]);
      let effect = this.effects[i].substring(0, this.effects[i].length-3);
      if (strain.effects[effect]){
        if (value>0){
          continue;
        }
        if (value*strain.effects[effect]<min){
          min = value*strain.effects[effect];
          minEffect= effect;
        }
      }
    }
    return {"value": min, "effect": minEffect};
  }

  resolvePoints(strain):number{
    this.loadGeneticsForCurrentUser();
    let points = 0;
    let genetics = this.userGenetics;
    for (let geneticPhenotype in genetics){
      let power = genetics[geneticPhenotype];
      let phenotypeValues = this.phenotypes[TextUtils.capitalizeFirstLetter(geneticPhenotype)].split(",");
      for (let i=0; i<phenotypeValues.length; i++){
        let value = parseInt(phenotypeValues[i]);
        let effect = this.effects[i].substring(0, this.effects[i].length-3);
        if (strain.effects[effect]){
          points = points + value*power*strain.effects[effect];
        }
      }
    }
    return points;
  }

  calculateMatchOfAllStrains(){
    let match = {};
    let strains = this.strainDao.getStrainsEffectsDefined();
    for (let strain of strains){
      let match = this.resolvePoints(strain);
    }

  }

  isReady(){
    return this.phenotypesReady && this.effectsReady && this.userGeneticsReady;
  }


}
