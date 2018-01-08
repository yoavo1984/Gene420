import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class EventBusService {

  private observableByName = {};
  private observerByName = {};

  constructor() { }

  publish(name, data?){
    if (this.observableByName[name]){
      this.observerByName[name].next(data);
    }
    else {
      this.observableByName[name] = new Observable(observer => {
        this.observerByName[name] = observer;
        observer.next(data);
      });
    }
  }

  subscribe(name:string, callback: (value) => any){
    if (!this.observableByName[name]){
      this.observableByName[name] = new Observable(observer => {
        this.observerByName[name] = observer;
      });
    }
    this.observableByName[name].subscribe(
      value => callback(value),
      error => console.log(error)
    );
  }

  unSubscribe(){
    //TODO: implement
  }

}
