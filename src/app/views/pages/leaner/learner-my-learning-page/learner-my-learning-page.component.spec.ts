import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMyLearningPageComponent } from './learner-my-learning-page.component';

describe('LearnerMyLearningPageComponent', () => {
  let component: LearnerMyLearningPageComponent;
  let fixture: ComponentFixture<LearnerMyLearningPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerMyLearningPageComponent]
    });
    fixture = TestBed.createComponent(LearnerMyLearningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
