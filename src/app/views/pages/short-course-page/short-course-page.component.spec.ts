import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCoursePageComponent } from './short-course-page.component';

describe('ShortCoursePageComponent', () => {
  let component: ShortCoursePageComponent;
  let fixture: ComponentFixture<ShortCoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortCoursePageComponent]
    });
    fixture = TestBed.createComponent(ShortCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
