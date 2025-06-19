import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageDetailsComponent } from './course-page-details.component';

describe('CoursePageDetailsComponent', () => {
  let component: CoursePageDetailsComponent;
  let fixture: ComponentFixture<CoursePageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePageDetailsComponent]
    });
    fixture = TestBed.createComponent(CoursePageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
