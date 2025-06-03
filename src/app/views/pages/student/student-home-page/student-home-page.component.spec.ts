import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomePageComponent } from './student-home-page.component';

describe('StudentHomePageComponent', () => {
  let component: StudentHomePageComponent;
  let fixture: ComponentFixture<StudentHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentHomePageComponent]
    });
    fixture = TestBed.createComponent(StudentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
