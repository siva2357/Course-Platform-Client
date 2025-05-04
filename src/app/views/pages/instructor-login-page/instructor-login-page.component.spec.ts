import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLoginPageComponent } from './instructor-login-page.component';

describe('InstructorLoginPageComponent', () => {
  let component: InstructorLoginPageComponent;
  let fixture: ComponentFixture<InstructorLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorLoginPageComponent]
    });
    fixture = TestBed.createComponent(InstructorLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
