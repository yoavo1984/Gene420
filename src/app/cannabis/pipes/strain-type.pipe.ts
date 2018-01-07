import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strainType'
})
export class StrainTypePipe implements PipeTransform {

  transform(value: any, typeName:string): any {
    if (value){
      let strainsOfType = [];
      for (let strain of value){
        if (strain.type == typeName){
          strainsOfType.push(strain);
        }
      }
      return strainsOfType;
    }
  }

}
