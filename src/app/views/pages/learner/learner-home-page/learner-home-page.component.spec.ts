import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerHomePageComponent } from './learner-home-page.component';

describe('LearnerHomePageComponent', () => {
  let component: LearnerHomePageComponent;
  let fixture: ComponentFixture<LearnerHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerHomePageComponent]
    });
    fixture = TestBed.createComponent(LearnerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
