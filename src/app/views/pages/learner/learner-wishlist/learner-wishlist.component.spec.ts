import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerWishlistComponent } from './learner-wishlist.component';

describe('LearnerWishlistComponent', () => {
  let component: LearnerWishlistComponent;
  let fixture: ComponentFixture<LearnerWishlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerWishlistComponent]
    });
    fixture = TestBed.createComponent(LearnerWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
