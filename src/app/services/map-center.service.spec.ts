import { TestBed } from '@angular/core/testing';

import { MapCenterService } from './map-center.service';

describe('MapCenterService', () => {
  let service: MapCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
