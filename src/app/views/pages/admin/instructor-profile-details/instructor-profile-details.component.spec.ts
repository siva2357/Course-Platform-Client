import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileDetailsComponent } from './instructor-profile-details.component';

describe('InstructorProfileDetailsComponent', () => {
  let component: InstructorProfileDetailsComponent;
  let fixture: ComponentFixture<InstructorProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorProfileDetailsComponent]
    });
    fixture = TestBed.createComponent(InstructorProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
