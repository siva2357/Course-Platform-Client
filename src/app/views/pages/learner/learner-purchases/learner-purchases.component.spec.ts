import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerPurchasesComponent } from './learner-purchases.component';

describe('LearnerPurchasesComponent', () => {
  let component: LearnerPurchasesComponent;
  let fixture: ComponentFixture<LearnerPurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerPurchasesComponent]
    });
    fixture = TestBed.createComponent(LearnerPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
