import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCoursePageComponent } from './instructor-course-page.component';

describe('InstructorCoursePageComponent', () => {
  let component: InstructorCoursePageComponent;
  let fixture: ComponentFixture<InstructorCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCoursePageComponent]
    });
    fixture = TestBed.createComponent(InstructorCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
