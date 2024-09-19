import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapCenterService } from '../../services/map-center.service';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss',
})
export class HintComponent {
  @ViewChild('hint', { static: false }) hint!: ElementRef;
  @ViewChild('hintLarge', { static: false }) hintLarge!: ElementRef;
  @ViewChild('wrapper', { static: false }) wrapper!: ElementRef;
  constructor(private mapService: MapCenterService) {}
  public citySelected = false;
  public step = 1;
  public cities = [
    {
      name: 'Астана',
      center: [51.128404, 71.427528],
      active: true,
    },
    {
      name: 'Алматы',
      center: [43.236888288571514, 76.91460453983467],
      active: false,
    },
    {
      name: 'Шымкент',
      center: [42.318104777, 69.5931198],
      active: false,
    },
  ];
  setActiveCity(event: number): void {
    this.cities.forEach(city => (city.active = false));
    this.cities[event].active = true;
    this.mapService.center = this.cities[event].center;
    this.citySelected = true;
    const search: any = document.querySelectorAll('.navbar-search')[0];
    search.style.zIndex = '100';
  }
  close() {
    this.wrapper.nativeElement.setAttribute('style', 'display: none');
    this.hintLarge.nativeElement.setAttribute('style', 'display: none');
    this.hint.nativeElement.setAttribute('style', 'display: none');
  }
  next(step: number) {
    this.step = step;
    const mapMenu: any = document.querySelectorAll('.map-menu')[0];
    if (this.step === 2) {
      mapMenu.style.zIndex = '100';
      const search: any = document.querySelectorAll('.navbar-search')[0];
      search.style.zIndex = '1';
      this.hint.nativeElement.setAttribute('style', 'top: 390px;left:90px');
      this.hint.nativeElement.children[2].innerHTML =
        'Выберите необходимые критерии для анализа локации.';
    } else if (this.step === 3) {
      this.hint.nativeElement.setAttribute('style', 'display: none');
      this.hintLarge.nativeElement.setAttribute('style', 'display: block');
      mapMenu.style.zIndex = '1';
    } else {
      this.wrapper.nativeElement.setAttribute('style', 'display: none');
      this.hintLarge.nativeElement.setAttribute('style', 'display: none');
    }
  }
}
