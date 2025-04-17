import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorCreateCoursePageComponent } from './educator-create-course-page.component';

describe('EducatorCreateCoursePageComponent', () => {
  let component: EducatorCreateCoursePageComponent;
  let fixture: ComponentFixture<EducatorCreateCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorCreateCoursePageComponent]
    });
    fixture = TestBed.createComponent(EducatorCreateCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
