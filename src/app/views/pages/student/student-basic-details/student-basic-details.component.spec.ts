import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasicDetailsComponent } from './student-basic-details.component';

describe('StudentBasicDetailsComponent', () => {
  let component: StudentBasicDetailsComponent;
  let fixture: ComponentFixture<StudentBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
