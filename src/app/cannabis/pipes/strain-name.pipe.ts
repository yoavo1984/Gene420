import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strainName'
})
export class StrainNamePipe implements PipeTransform {

  transform(value: any, name): any {
    if (value){
      for (let strain of value){
        if (strain.name == name){
          return strain;
        }
      }
    }

  }

}
