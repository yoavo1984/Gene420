import {Injectable} from '@angular/core';
import {StrainDaoService} from "./strain-dao.service";
import {UserDaoService} from "../../users/services/user-dao.service";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../authentication/services/auth-service";
import {TextUtils} from "../../utils/TextUtils";
import * as firebase from 'firebase/app';
import {Phenome, createEmptyPhenome} from "../../users/model/Phenome";

@Injectable()
export class MatcherService {

  private effects;
  private effectsReady: boolean;
  private correlationMatrix;
  private phenotypesReady: boolean;
  private userPhenome: Phenome;
  private userPhenomeReady: boolean;

  constructor(private strainDao: StrainDaoService,
              private userDao: UserDaoService,
              private angularFire: AngularFireDatabase,
              private authService: AuthService,
              private userDaoService: UserDaoService) {

    this.loadEffects();
    this.loadPhenotypeEffectCorrelationMatrix();
    this.registerOnAuthStateChange();

  }

  registerOnAuthStateChange() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user /*&& user.emailVerified*/) {
        this.loadPhenomeForCurrentUser();
      }
    });
  }


  loadEffects() {
    let effects = this.angularFire.object('/effects').valueChanges();
    effects.subscribe((effects)=> {
      this.effects = effects;
      this.effectsReady = true;
    })
  }

  loadPhenotypeEffectCorrelationMatrix() {
    let effects = this.angularFire.object('/phenotypes').valueChanges();
    effects.subscribe((correlationMatrix)=> {
      this.correlationMatrix = correlationMatrix;
      this.phenotypesReady = true;
    })
  }

  loadPhenomeForCurrentUser() {
    let genetics = this.userDaoService.getGenetics(this.authService.getCurrentUserUid());
    genetics.subscribe((geneticData: Phenome)=> {

      for (let phenotype in geneticData) {
        if (!this.userPhenome) {
          this.userPhenome = createEmptyPhenome();
        }
        this.userPhenome[phenotype] = geneticData[phenotype];
      }
      this.userPhenomeReady = true;
    });
  }

  //TODO: merge these
  getMostAffectingPositiveEffectForPhenotype(strain, phenotypeName) {
    let maxEffect;
    let max = 0;
    let phenome: Phenome = this.userPhenome;

    let power = phenome[phenotypeName];
    let phenotypeVector = this.correlationMatrix[TextUtils.capitalizeFirstLetter(phenotypeName)].split(",");
    for (let i = 0; i < phenotypeVector.length; i++) {
      let value = parseInt(phenotypeVector[i]);
      let effect = this.effects[i].substring(0, this.effects[i].length - 3);
      if (strain.effects[effect]) {
        if (value < 0) {
          continue;
        }
        if (value * strain.effects[effect] > max) {
          max = value * strain.effects[effect];
          maxEffect = effect;
        }
      }
    }
    return {"value": max, "effect": maxEffect};
  }

  getMostAffectingNegativeEffectForPhenotype(strain, phenotypeName) {
    //TODO: should return a promise
    let minEffect;
    let min = 0;
    let genetics = this.userPhenome;

    let power = genetics[phenotypeName];
    let phenotypeValues = this.correlationMatrix[TextUtils.capitalizeFirstLetter(phenotypeName)].split(",");
    for (let i = 0; i < phenotypeValues.length; i++) {
      let value = parseInt(phenotypeValues[i]);
      let effect = this.effects[i].substring(0, this.effects[i].length - 3);
      if (strain.effects[effect]) {
        if (value > 0) {
          continue;
        }
        if (value * strain.effects[effect] < min) {
          min = value * strain.effects[effect];
          minEffect = effect;
        }
      }
    }
    return {"value": min, "effect": minEffect};
  }

  resolvePoints(strain): number {
    //TODO: should return a promise
    this.loadPhenomeForCurrentUser();
    let points = 0;
    let phenome: Phenome = this.userPhenome;
    for (let phenotype in phenome) {
      let power = phenome[phenotype];
      let phenotypeVector = this.correlationMatrix[TextUtils.capitalizeFirstLetter(phenotype)].split(",");
      for (let i = 0; i < phenotypeVector.length; i++) {
        let value = parseInt(phenotypeVector[i]);
        let effect = this.effects[i].substring(0, this.effects[i].length - 3);
        if (strain.effects[effect]) {
          points = points + value * power * strain.effects[effect];
        }
      }
    }
    return points;
  }

  calculateMatchOfAllStrains() {
    let match = {};
    let strains = this.strainDao.getStrainsEffectsDefined();
    for (let strain of strains) {
      let match = this.resolvePoints(strain);
    }

  }

  isReady() {
    return this.phenotypesReady && this.effectsReady && this.userPhenomeReady;
  }


}
