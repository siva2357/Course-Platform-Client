import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginPageComponent } from './student-login-page.component';

describe('StudentLoginPageComponent', () => {
  let component: StudentLoginPageComponent;
  let fixture: ComponentFixture<StudentLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLoginPageComponent]
    });
    fixture = TestBed.createComponent(StudentLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
