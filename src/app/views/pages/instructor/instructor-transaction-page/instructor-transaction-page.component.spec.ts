import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTransactionPageComponent } from './instructor-transaction-page.component';

describe('InstructorTransactionPageComponent', () => {
  let component: InstructorTransactionPageComponent;
  let fixture: ComponentFixture<InstructorTransactionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorTransactionPageComponent]
    });
    fixture = TestBed.createComponent(InstructorTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
