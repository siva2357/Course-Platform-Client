import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLandingPageComponent } from './course-landing-page.component';

describe('CourseLandingPageComponent', () => {
  let component: CourseLandingPageComponent;
  let fixture: ComponentFixture<CourseLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLandingPageComponent]
    });
    fixture = TestBed.createComponent(CourseLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
