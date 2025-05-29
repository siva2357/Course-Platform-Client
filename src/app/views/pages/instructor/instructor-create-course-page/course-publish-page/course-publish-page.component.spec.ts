import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePublishPageComponent } from './course-publish-page.component';

describe('CoursePublishPageComponent', () => {
  let component: CoursePublishPageComponent;
  let fixture: ComponentFixture<CoursePublishPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePublishPageComponent]
    });
    fixture = TestBed.createComponent(CoursePublishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
