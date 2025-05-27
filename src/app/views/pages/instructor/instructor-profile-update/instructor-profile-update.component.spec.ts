import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileUpdateComponent } from './instructor-profile-update.component';

describe('InstructorProfileUpdateComponent', () => {
  let component: InstructorProfileUpdateComponent;
  let fixture: ComponentFixture<InstructorProfileUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorProfileUpdateComponent]
    });
    fixture = TestBed.createComponent(InstructorProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
