import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseLearnersComponent } from './instructor-course-learners.component';

describe('InstructorCourseLearnersComponent', () => {
  let component: InstructorCourseLearnersComponent;
  let fixture: ComponentFixture<InstructorCourseLearnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseLearnersComponent]
    });
    fixture = TestBed.createComponent(InstructorCourseLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
