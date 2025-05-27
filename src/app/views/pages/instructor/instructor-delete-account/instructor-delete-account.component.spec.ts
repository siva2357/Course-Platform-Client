import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteAccountComponent } from './instructor-delete-account.component';

describe('InstructorDeleteAccountComponent', () => {
  let component: InstructorDeleteAccountComponent;
  let fixture: ComponentFixture<InstructorDeleteAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorDeleteAccountComponent]
    });
    fixture = TestBed.createComponent(InstructorDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
