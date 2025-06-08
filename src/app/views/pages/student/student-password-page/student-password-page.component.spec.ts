import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPasswordPageComponent } from './student-password-page.component';

describe('StudentPasswordPageComponent', () => {
  let component: StudentPasswordPageComponent;
  let fixture: ComponentFixture<StudentPasswordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPasswordPageComponent]
    });
    fixture = TestBed.createComponent(StudentPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
