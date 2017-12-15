import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genetics'
})
export class GeneticsPipe implements PipeTransform {

  transform(value: any, uid: any): any {
    if (value){
      let user = value;
      let genetics = user["genetics"];
      let phenotype = [];
      for (let trait in genetics){
        if (genetics[trait] == 0){
          phenotype.push({trait:trait, has:false})
        }
        if (genetics[trait] == 1){
          phenotype.push({trait:trait, has:true})
        }
      }
      return phenotype;
    }

  }

}
