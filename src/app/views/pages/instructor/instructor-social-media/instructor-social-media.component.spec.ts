import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSocialMediaComponent } from './instructor-social-media.component';

describe('InstructorSocialMediaComponent', () => {
  let component: InstructorSocialMediaComponent;
  let fixture: ComponentFixture<InstructorSocialMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSocialMediaComponent]
    });
    fixture = TestBed.createComponent(InstructorSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
