import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerRegistrationPageComponent } from './learner-registration-page.component';

describe('LearnerRegistrationPageComponent', () => {
  let component: LearnerRegistrationPageComponent;
  let fixture: ComponentFixture<LearnerRegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerRegistrationPageComponent]
    });
    fixture = TestBed.createComponent(LearnerRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
