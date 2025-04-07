import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerTrackPageComponent } from './career-track-page.component';

describe('CareerTrackPageComponent', () => {
  let component: CareerTrackPageComponent;
  let fixture: ComponentFixture<CareerTrackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerTrackPageComponent]
    });
    fixture = TestBed.createComponent(CareerTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
