import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseLearningComponent } from './student-course-learning.component';

describe('StudentCourseLearningComponent', () => {
  let component: StudentCourseLearningComponent;
  let fixture: ComponentFixture<StudentCourseLearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseLearningComponent]
    });
    fixture = TestBed.createComponent(StudentCourseLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
