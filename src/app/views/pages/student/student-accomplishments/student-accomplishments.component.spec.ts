import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccomplishmentsComponent } from './student-accomplishments.component';

describe('StudentAccomplishmentsComponent', () => {
  let component: StudentAccomplishmentsComponent;
  let fixture: ComponentFixture<StudentAccomplishmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAccomplishmentsComponent]
    });
    fixture = TestBed.createComponent(StudentAccomplishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
