import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { GeocodeItem } from '../../types/geocode-result';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() showSearch = true;
  @Input() searchResult$: Observable<GeocodeItem[]> | null = null;
  @Input() isAbsolute = true;
  @Output() emitQuery = new EventEmitter();
  @Output() emitCoordinates = new EventEmitter();
  public searchQuery = '';
  public showMobileMenu = false;
  public showMainMenu = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  onSearchChange(query: string) {
    if (query && query.length > 0) {
      this.emitQuery.emit(query);
    } else {
      this.searchResult$ = null;
    }
  }
  flyMap(position: any, title: string) {
    this.emitCoordinates.emit({ position, title });
  }

  protected readonly length = length;
}
