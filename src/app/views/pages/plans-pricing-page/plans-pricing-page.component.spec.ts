import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPricingPageComponent } from './plans-pricing-page.component';

describe('PlansPricingPageComponent', () => {
  let component: PlansPricingPageComponent;
  let fixture: ComponentFixture<PlansPricingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlansPricingPageComponent]
    });
    fixture = TestBed.createComponent(PlansPricingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
