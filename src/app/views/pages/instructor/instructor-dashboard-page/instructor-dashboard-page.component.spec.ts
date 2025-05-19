import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDashboardPageComponent } from './instructor-dashboard-page.component';

describe('InstructorDashboardPageComponent', () => {
  let component: InstructorDashboardPageComponent;
  let fixture: ComponentFixture<InstructorDashboardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorDashboardPageComponent]
    });
    fixture = TestBed.createComponent(InstructorDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
