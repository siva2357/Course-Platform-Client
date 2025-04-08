import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMainPageComponent } from './learner-main-page.component';

describe('LearnerMainPageComponent', () => {
  let component: LearnerMainPageComponent;
  let fixture: ComponentFixture<LearnerMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerMainPageComponent]
    });
    fixture = TestBed.createComponent(LearnerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
