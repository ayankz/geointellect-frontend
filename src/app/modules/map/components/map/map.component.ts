import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { MapCenterService } from '../../../../services/map-center.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LayersResponse } from '../../types/layers-response';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { GroupName } from '../../enum/type';
import { GeocodeService } from '../../../../services/geocode.service';
import { GeocodeItem } from '../../../../types/geocode-result';
import { Layers } from '../../enum/layers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  text: string = '';
  token: string = '';
  showLayers: boolean = true;
  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;
  testUser = {
    username: 'string',
    password: 'string',
  };
  map: mapboxgl.Map | undefined;
  geocoder: MapboxGeocoder | undefined;
  selectedLngLta: { lng: number; lat: number } = { lng: 0, lat: 0 };
  layers$: Observable<any> = this.getLayers();
  competitors: any[] = [];
  layerIcons: string[] = [
    Layers.FIRST,
    Layers.SECOND,
    Layers.THIRD,
    Layers.FOURTH,
  ];
  commonIcons = [
    Layers.COMMON_first,
    Layers.COMMON_second,
    Layers.COMMON_third,
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
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.selectedAddress$ = this.geocodeService.selectedAddress$;
    this.selectedCoordinates$ = this.geocodeService.selectedLngLtd$;
    this.initializeMap();
    const center = this.mapService.center as [number, number];
    this.map?.setCenter(center);
    this.getLayers();
    this.setLayerIds();
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: environment.mapbox.style,
      zoom: 12,
    });
    this.map.on('click', event => {
      this.selectedLngLta = event.lngLat;
      this.geocodeService.getReverseGeocode(event.lngLat).subscribe(r => {
        if (r) {
          this.map?.setCenter([event.lngLat.lng, event.lngLat.lat]);
          this.addMarkerWithTemplate(event.lngLat);
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
    });
    this.map?.addControl(this.geocoder);
  }

  search(event: string) {
    this.clearMarkers();
    this.onClose();
    this.searchItems$ = this.geocodeService.searchByQuery(event);
  }

  moveTo(event: any, title: string) {
    this.geocodeService.selectedAddress = title;
    const { lat, lng } = event;
    this.addMarkerWithTemplate(event);
    this.map?.flyTo({
      center: [lng, lat],
      zoom: 16,
    });
  }

  addMarkerWithTemplate(event: any) {
    this.searchItems$ = null;
    this.clearMarkers();
    const coordinates = event;
    this.pointCoordinates = { lat: coordinates.lat, lng: coordinates.lng };
    const markerElement = document.createElement('div');
    const modalDiv = document.createElement('div');
    modalDiv.addEventListener('click', (event: Event) =>
      event.stopPropagation()
    );
    markerElement.classList.add('marker');
    modalDiv.classList.add('modal');
    this.renderTemplateToElement(modalDiv, { name: '' });
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
    return this.http
      .post<LayersResponse>(environment.API_URL + 'layers/list', {})
      .pipe(
        map((layers: LayersResponse) => {
          return Object.values(
            layers.results.reduce(
              (acc: any, el: any, currentIndex: number) => {
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
    this.showLayers = true;
  }

  onCheckboxClick(event: any, layer: any) {
    event.stopPropagation();
    if (!event.target.checked) {
      this.layersIds = this.layersIds.filter(id => id !== layer.layerId);
    } else {
      this.layersIds.push(layer.layerId);
    }
  }

  selectLayerIds(event: any, layer: any) {
    if (event.target.checked) {
      this.layersIds.push(layer.layerId);
    } else {
      this.layersIds = this.layersIds.filter(id => id !== layer.layerId);
    }
  }
  setLayerIds() {
    this.layersIds = [4278, 4276, 4277];
  }

  onCreateReport(event: MouseEvent) {
    this.showLayers = !this.showLayers;
    event.stopPropagation();
    const requestOptions: Object = {
      responseType: 'text',
    };
    this.http
      .post<string>(
        environment.API_URL + 'auth/generate-token',
        {
          username: 'string',
          password: 'string',
        },
        requestOptions
      )
      .subscribe((token: any) => {
        this.token = token;
        this.http
          .post(
            environment.API_URL + 'report/create-in-radius',
            {
              layerIds: this.layersIds,
              longitude: this.pointCoordinates?.lng,
              latitude: this.pointCoordinates?.lat,
              radiusSize: 1000,
              name: 'string',
            },
            { headers: { token: token } }
          )
          .subscribe((response: any) => {
            this.setLayerIds();
            this.clearMarkers();
            // this.viewContainerRef.clear();
            this.snackBar.open(
              'Отчет создан, пройдите в раздел "Отчеты"',
              'Close',
              { duration: 4000 }
            );
          });
      });
  }
}
