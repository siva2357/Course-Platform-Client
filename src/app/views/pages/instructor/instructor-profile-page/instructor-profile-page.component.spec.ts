import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfilePageComponent } from './instructor-profile-page.component';

describe('InstructorProfilePageComponent', () => {
  let component: InstructorProfilePageComponent;
  let fixture: ComponentFixture<InstructorProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorProfilePageComponent]
    });
    fixture = TestBed.createComponent(InstructorProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
