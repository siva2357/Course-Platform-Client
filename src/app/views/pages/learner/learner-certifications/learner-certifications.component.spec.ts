import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCertificationsComponent } from './learner-certifications.component';

describe('LearnerCertificationsComponent', () => {
  let component: LearnerCertificationsComponent;
  let fixture: ComponentFixture<LearnerCertificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerCertificationsComponent]
    });
    fixture = TestBed.createComponent(LearnerCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
