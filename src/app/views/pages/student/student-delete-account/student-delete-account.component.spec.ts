import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteAccountComponent } from './student-delete-account.component';

describe('StudentDeleteAccountComponent', () => {
  let component: StudentDeleteAccountComponent;
  let fixture: ComponentFixture<StudentDeleteAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDeleteAccountComponent]
    });
    fixture = TestBed.createComponent(StudentDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
