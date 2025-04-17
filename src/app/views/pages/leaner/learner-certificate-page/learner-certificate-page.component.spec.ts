import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCertificatePageComponent } from './learner-certificate-page.component';

describe('LearnerCertificatePageComponent', () => {
  let component: LearnerCertificatePageComponent;
  let fixture: ComponentFixture<LearnerCertificatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerCertificatePageComponent]
    });
    fixture = TestBed.createComponent(LearnerCertificatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
