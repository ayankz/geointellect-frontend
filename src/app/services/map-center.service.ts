import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapCenterService {
  public center = new BehaviorSubject([51.128404 ,71.427528])
  constructor() { }
  setCenter(value: number[]){
    this.center.next(value);
  }
  getCenter(){
    return this.center as Observable<number[]>;
  }
}
