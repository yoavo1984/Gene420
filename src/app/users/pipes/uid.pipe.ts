import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uid'
})
export class UidPipe implements PipeTransform {

  transform(value: any, uid: any): any {
    if (uid){
      if (value[uid]){
        return value[uid];
      }
    }
  }

}
