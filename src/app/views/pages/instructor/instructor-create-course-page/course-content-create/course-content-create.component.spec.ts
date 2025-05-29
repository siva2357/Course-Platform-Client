import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentCreateComponent } from './course-content-create.component';

describe('CourseContentCreateComponent', () => {
  let component: CourseContentCreateComponent;
  let fixture: ComponentFixture<CourseContentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseContentCreateComponent]
    });
    fixture = TestBed.createComponent(CourseContentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
