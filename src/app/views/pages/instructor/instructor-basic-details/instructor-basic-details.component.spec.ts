import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorBasicDetailsComponent } from './instructor-basic-details.component';

describe('InstructorBasicDetailsComponent', () => {
  let component: InstructorBasicDetailsComponent;
  let fixture: ComponentFixture<InstructorBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(InstructorBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
