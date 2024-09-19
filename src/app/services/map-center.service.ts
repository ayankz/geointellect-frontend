import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapCenterService {
  private _center: number[] = [76.91460453983467, 43.236888288571514];
  set center(value: number[]) {
    this._center = value;
  }
  get center(): number[] {
    return this._center;
  }
}
