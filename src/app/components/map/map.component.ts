import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../environments/environment";
import {MapCenterService} from "../../services/map-center.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 76.91460453983467;
  lng: number = 43.236888288571514;
  point: number | null = null
  constructor(private mapService: MapCenterService) {

  }
  async ngOnInit() {
    const mapboxgl = await import('mapbox-gl');
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
    accessToken: environment.mapbox.accessToken,
    container: 'map',
    style: this.style,
    zoom: 10,
  });
  this.mapService.center.subscribe(center => {
    const [lat, lng] = center;
    this.lat = lat;
    this.lng = lng ;
    this.map?.setCenter([ this.lng,this.lat] )
  })

  this.map.on('click', (event) => {
    this.clearMarkers()
    const coordinates = event.lngLat;
    const markerElement = document.createElement('div');
    const modalDiv = document.createElement('div');
    markerElement.classList.add('marker')
    modalDiv.classList.add('modal')
    const marker = new mapboxgl.Marker(markerElement).setLngLat([coordinates.lng,coordinates.lat]).addTo(this.map!);
    const modal = new mapboxgl.Marker(modalDiv).setLngLat([coordinates.lng,coordinates.lat]).addTo(this.map!);
    modalDiv.appendChild(this.modalContent.nativeElement)
  })
  }
  clearMarkers(){
    const markerElements = document.querySelectorAll('.marker');
    const modalDivs = document.querySelectorAll('.modal');
    if (markerElements.length > 0){
      markerElements.forEach((el) => {
        el.remove();
      })
      modalDivs.forEach((el) => {
        el.remove();
      })
    }
  }
  setMapCenter():any[]{
    return [this.lat, this.lng];
  }
}
