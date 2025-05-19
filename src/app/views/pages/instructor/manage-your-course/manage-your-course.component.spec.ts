import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageYourCourseComponent } from './manage-your-course.component';

describe('ManageYourCourseComponent', () => {
  let component: ManageYourCourseComponent;
  let fixture: ComponentFixture<ManageYourCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageYourCourseComponent]
    });
    fixture = TestBed.createComponent(ManageYourCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
