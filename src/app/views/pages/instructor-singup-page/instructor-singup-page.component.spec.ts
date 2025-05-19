import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSingupPageComponent } from './instructor-singup-page.component';

describe('InstructorSingupPageComponent', () => {
  let component: InstructorSingupPageComponent;
  let fixture: ComponentFixture<InstructorSingupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSingupPageComponent]
    });
    fixture = TestBed.createComponent(InstructorSingupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
