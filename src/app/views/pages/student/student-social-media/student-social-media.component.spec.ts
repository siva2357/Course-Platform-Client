import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSocialMediaComponent } from './student-social-media.component';

describe('StudentSocialMediaComponent', () => {
  let component: StudentSocialMediaComponent;
  let fixture: ComponentFixture<StudentSocialMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSocialMediaComponent]
    });
    fixture = TestBed.createComponent(StudentSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
