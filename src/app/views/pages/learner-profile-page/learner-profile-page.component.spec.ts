import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerProfilePageComponent } from './learner-profile-page.component';

describe('LearnerProfilePageComponent', () => {
  let component: LearnerProfilePageComponent;
  let fixture: ComponentFixture<LearnerProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerProfilePageComponent]
    });
    fixture = TestBed.createComponent(LearnerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
