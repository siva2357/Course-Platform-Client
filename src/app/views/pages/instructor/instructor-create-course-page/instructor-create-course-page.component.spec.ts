import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCreateCoursePageComponent } from './instructor-create-course-page.component';

describe('InstructorCreateCoursePageComponent', () => {
  let component: InstructorCreateCoursePageComponent;
  let fixture: ComponentFixture<InstructorCreateCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCreateCoursePageComponent]
    });
    fixture = TestBed.createComponent(InstructorCreateCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
