import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePricePageComponent } from './course-price-page.component';

describe('CoursePricePageComponent', () => {
  let component: CoursePricePageComponent;
  let fixture: ComponentFixture<CoursePricePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePricePageComponent]
    });
    fixture = TestBed.createComponent(CoursePricePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
