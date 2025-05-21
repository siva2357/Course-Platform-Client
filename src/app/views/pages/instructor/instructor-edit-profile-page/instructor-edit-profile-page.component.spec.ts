import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorEditProfilePageComponent } from './instructor-edit-profile-page.component';

describe('InstructorEditProfilePageComponent', () => {
  let component: InstructorEditProfilePageComponent;
  let fixture: ComponentFixture<InstructorEditProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorEditProfilePageComponent]
    });
    fixture = TestBed.createComponent(InstructorEditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
