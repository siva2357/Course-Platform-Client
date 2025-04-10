import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerLoginPageComponent } from './learner-login-page.component';

describe('LearnerLoginPageComponent', () => {
  let component: LearnerLoginPageComponent;
  let fixture: ComponentFixture<LearnerLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerLoginPageComponent]
    });
    fixture = TestBed.createComponent(LearnerLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
