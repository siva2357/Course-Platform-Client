import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileformPageComponent } from './student-profileform-page.component';

describe('StudentProfileformPageComponent', () => {
  let component: StudentProfileformPageComponent;
  let fixture: ComponentFixture<StudentProfileformPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfileformPageComponent]
    });
    fixture = TestBed.createComponent(StudentProfileformPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
