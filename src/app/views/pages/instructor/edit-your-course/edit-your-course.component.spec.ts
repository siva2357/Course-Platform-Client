import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYourCourseComponent } from './edit-your-course.component';

describe('EditYourCourseComponent', () => {
  let component: EditYourCourseComponent;
  let fixture: ComponentFixture<EditYourCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditYourCourseComponent]
    });
    fixture = TestBed.createComponent(EditYourCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
