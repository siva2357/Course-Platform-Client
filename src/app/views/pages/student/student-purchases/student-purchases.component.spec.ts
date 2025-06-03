import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPurchasesComponent } from './student-purchases.component';

describe('StudentPurchasesComponent', () => {
  let component: StudentPurchasesComponent;
  let fixture: ComponentFixture<StudentPurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPurchasesComponent]
    });
    fixture = TestBed.createComponent(StudentPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
