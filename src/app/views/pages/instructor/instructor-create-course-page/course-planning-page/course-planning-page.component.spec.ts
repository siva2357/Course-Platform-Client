import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlanningPageComponent } from './course-planning-page.component';

describe('CoursePlanningPageComponent', () => {
  let component: CoursePlanningPageComponent;
  let fixture: ComponentFixture<CoursePlanningPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePlanningPageComponent]
    });
    fixture = TestBed.createComponent(CoursePlanningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
