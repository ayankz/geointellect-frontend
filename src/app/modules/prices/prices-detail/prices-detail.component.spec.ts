import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesDetailComponent } from './prices-detail.component';

describe('PricesDetailComponent', () => {
  let component: PricesDetailComponent;
  let fixture: ComponentFixture<PricesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
