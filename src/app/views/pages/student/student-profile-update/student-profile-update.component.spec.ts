import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileUpdateComponent } from './student-profile-update.component';

describe('StudentProfileUpdateComponent', () => {
  let component: StudentProfileUpdateComponent;
  let fixture: ComponentFixture<StudentProfileUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfileUpdateComponent]
    });
    fixture = TestBed.createComponent(StudentProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
