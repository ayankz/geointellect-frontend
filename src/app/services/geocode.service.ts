import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../modules/map/types/coordinate';
import { GeocodeItem, GeocodeResult } from '../types/geocode-result';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  public reverseGeocodeUrl = `${environment.geocode.reverseGeocodeUrl}?apiKey=${environment.geocode.API_KEY}`;
  public searchUrl = `${environment.geocode.searchUrl}?apiKey=${environment.geocode.API_KEY}`;
  public _selectedAddress: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public _selectedLngLtd: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  constructor(private http: HttpClient) {}
  getReverseGeocode(
    coordinates: Coordinate,
    lang = 'ru-RU'
  ): Observable<string | null> {
    const { lat, lng } = coordinates;
    this.http
      .get<GeocodeResult>(
        `${this.reverseGeocodeUrl}&at=${lat},${lng}&lang=${lang}`
      )
      .pipe(map(res => res.items[0]))
      .subscribe(res => {
        const { lat, lng } = res.position;
        this.selectedLngLtd = `${lat} = ${lng}`;
        this.selectedAddress = res.title.split(',').reverse().join();
      });
    return this.selectedAddress$;
  }
  searchByQuery(query: string): Observable<GeocodeItem[]> {
    return this.http
      .get<GeocodeResult>(
        `${this.searchUrl}&q=${encodeURIComponent(query)}&in=countryCode:KAZ`
      )
      .pipe(map(response => response.items));
  }

  set selectedAddress(address: string | null) {
    this._selectedAddress.next(address);
  }
  get selectedAddress$(): Observable<string | null> {
    return this._selectedAddress.asObservable();
  }
  set selectedLngLtd(address: string | null) {
    this._selectedLngLtd.next(address);
  }
  get selectedLngLtd$(): Observable<string | null> {
    return this._selectedLngLtd.asObservable();
  }
}
