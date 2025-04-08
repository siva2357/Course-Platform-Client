import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerNavbarComponent } from './learner-navbar.component';

describe('LearnerNavbarComponent', () => {
  let component: LearnerNavbarComponent;
  let fixture: ComponentFixture<LearnerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerNavbarComponent]
    });
    fixture = TestBed.createComponent(LearnerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
