import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMyCoursesComponent } from './learner-my-courses.component';

describe('LearnerMyCoursesComponent', () => {
  let component: LearnerMyCoursesComponent;
  let fixture: ComponentFixture<LearnerMyCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerMyCoursesComponent]
    });
    fixture = TestBed.createComponent(LearnerMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
