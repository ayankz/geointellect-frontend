import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { MapCenterService } from '../../../../services/map-center.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LayersResponse } from '../../types/layers-response';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { GroupName } from '../../enum/type';
import { GeocodeService } from '../../../../services/geocode.service';
import { GeocodeItem } from '../../../../types/geocode-result';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;

  map: mapboxgl.Map | undefined;
  geocoder: MapboxGeocoder | undefined;
  layers$: Observable<any> = this.getLayers();
  competitors: any[] = [];
  layerIcons: string[] = [
    'assets/svg/layer1.svg',
    'assets/svg/layer2.svg',
    'assets/svg/layer3.svg',
    'assets/svg/layer4.svg',
  ];
  commonLayers: {
    groupIdForMain: number | null;
    groupNameForMain: string | null;
    layers: any[];
  } = { groupIdForMain: null, groupNameForMain: null, layers: [] };
  title = '';
  searchItems$: Observable<GeocodeItem[]> | null = null;
  selectedAddress$: Observable<string | null> | undefined;
  selectedCoordinates$: Observable<string | null> | undefined;
  pointCoordinates: { lat: number; lng: number } | null = null;
  layersIds: any[] = [];
  constructor(
    private mapService: MapCenterService,
    private http: HttpClient,
    private geocodeService: GeocodeService,
    private viewContainerRef: ViewContainerRef
  ) {}
  ngOnInit() {
    this.selectedAddress$ = this.geocodeService.selectedAddress$;
    this.selectedCoordinates$ = this.geocodeService.selectedLngLtd$;
    this.initializeMap();
    const center = this.mapService.center as [number, number];
    this.map?.setCenter(center);
    this.getLayers();
  }
  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: environment.mapbox.style,
      zoom: 12,
    });
    this.map?.on('click', event => {
      this.geocodeService.getReverseGeocode(event.lngLat).subscribe(r => {
        if (r) {
          this.addMarkerWithTemplate(event);
        }
      });
    });
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for places',
      marker: true,
      flyTo: true,
      language: 'ru',
      types: 'address',
      zoom: 14,
      proximity: {
        longitude: 76.928, // Долгота для центра Алматы
        latitude: 43.236, // Широта для центра Алматы
      },
    });
    this.map?.addControl(this.geocoder);
  }
  search(event: string) {
    this.clearMarkers();
    this.searchItems$ = this.geocodeService.searchByQuery(event);
  }
  moveTo(event: { lat: number; lng: number }) {
    const { lat, lng } = event;
    this.map?.flyTo({
      center: [lng, lat],
      zoom: 16,
    });
  }
  addMarkerWithTemplate(event: any) {
    this.searchItems$ = null;
    this.clearMarkers();
    const coordinates = event.lngLat;
    this.pointCoordinates = { lat: coordinates.lat, lng: coordinates.lng };
    const markerElement = document.createElement('div');
    const modalDiv = document.createElement('div');
    markerElement.classList.add('marker');
    modalDiv.classList.add('modal');
    this.renderTemplateToElement(modalDiv, { name: 'Layer Example' });
    new mapboxgl.Marker(markerElement)
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(this.map!);
    new mapboxgl.Marker(modalDiv)
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(this.map!);
  }
  renderTemplateToElement(element: HTMLElement, context: any) {
    const embeddedView = this.modalTemplate.createEmbeddedView({
      $implicit: context,
    });
    this.viewContainerRef.insert(embeddedView);
    embeddedView.rootNodes.forEach(node => {
      element.appendChild(node);
    });
  }
  getLayers(): Observable<any[]> {
    const layerListUrl =
      'https://geo-intellect-e1414ec9c703.herokuapp.com/layers/list';
    return this.http.post<LayersResponse>(layerListUrl, {}).pipe(
      map((layers: LayersResponse) => {
        return Object.values(
          layers.results.reduce(
            (acc: any, el: any) => {
              if (el.groupNameForMain != GroupName.COMMON) {
                const groupId = el.groupIdForMain;
                if (!acc[groupId]) {
                  acc[groupId] = {
                    groupIdForMain: groupId,
                    groupNameForMain: el.groupNameForMain,
                    layers: [],
                  };
                }
                acc[groupId].layers.push({
                  layerId: el.id,
                  name: el.name,
                });
              } else {
                this.commonLayers.groupIdForMain = el.groupIdForMain;
                this.commonLayers.groupNameForMain = el.groupNameForMain;
                this.commonLayers.layers.push({
                  name: el.name,
                  layerId: el.id,
                });
              }
              return acc;
            },
            {} as Record<
              number,
              {
                groupIdForMain: number;
                groupNameForMain: string;
                layers: any[];
              }
            >
          )
        );
      })
    );
  }
  onClose(): void {
    this.competitors = [];
  }
  clearMarkers() {
    const markerElements = document.querySelectorAll('.marker');
    const modalDivs = document.querySelectorAll('.modal');
    if (markerElements.length > 0) {
      markerElements.forEach(el => {
        el.remove();
      });
      modalDivs.forEach(el => {
        el.remove();
      });
    }
  }
  getLayerItems(name: string, layers: any) {
    this.title = name;
    this.competitors = [...layers];
  }
  onCheckboxClick(event: any, layer: any) {
    event.stopPropagation();
    if (event.target.checked) {
      this.layersIds.push(layer.layerId);
    } else {
      this.layersIds = this.layersIds.filter(id => id !== layer.layerId);
    }
  }
  selectLayerIds(event: MouseEvent, layer: { name: string }) {}
  onCreateReport(event: MouseEvent) {
    event.stopPropagation();
    // this.http.post('https://geo-intellect-e1414ec9c703.herokuapp.com/report/create-in-radius', {
    //   layerId: this.layersIds[0],
    //   longitude: this.pointCoordinates?.lng,
    //   latitude: this.pointCoordinates?.lat,
    //   radiusSize: 1000,
    //   name: "string"
    // }).subscribe(response => {
    // })
  }
}
