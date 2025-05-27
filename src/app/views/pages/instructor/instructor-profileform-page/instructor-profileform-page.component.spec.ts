import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileformPageComponent } from './instructor-profileform-page.component';

describe('InstructorProfileformPageComponent', () => {
  let component: InstructorProfileformPageComponent;
  let fixture: ComponentFixture<InstructorProfileformPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorProfileformPageComponent]
    });
    fixture = TestBed.createComponent(InstructorProfileformPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
