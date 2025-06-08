import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPasswordPageComponent } from './instructor-password-page.component';

describe('InstructorPasswordPageComponent', () => {
  let component: InstructorPasswordPageComponent;
  let fixture: ComponentFixture<InstructorPasswordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorPasswordPageComponent]
    });
    fixture = TestBed.createComponent(InstructorPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
