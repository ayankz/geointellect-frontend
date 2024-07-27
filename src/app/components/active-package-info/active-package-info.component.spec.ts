import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePackageInfoComponent } from './active-package-info.component';

describe('ActivePackageInfoComponent', () => {
  let component: ActivePackageInfoComponent;
  let fixture: ComponentFixture<ActivePackageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePackageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivePackageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
