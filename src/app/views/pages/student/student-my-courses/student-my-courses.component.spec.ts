import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCoursesComponent } from './student-my-courses.component';

describe('StudentMyCoursesComponent', () => {
  let component: StudentMyCoursesComponent;
  let fixture: ComponentFixture<StudentMyCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMyCoursesComponent]
    });
    fixture = TestBed.createComponent(StudentMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
