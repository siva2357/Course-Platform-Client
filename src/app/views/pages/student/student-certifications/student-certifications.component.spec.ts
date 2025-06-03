import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCertificationsComponent } from './student-certifications.component';

describe('StudentCertificationsComponent', () => {
  let component: StudentCertificationsComponent;
  let fixture: ComponentFixture<StudentCertificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCertificationsComponent]
    });
    fixture = TestBed.createComponent(StudentCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
