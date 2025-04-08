import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorRegistrationPageComponent } from './educator-registration-page.component';

describe('EducatorRegistrationPageComponent', () => {
  let component: EducatorRegistrationPageComponent;
  let fixture: ComponentFixture<EducatorRegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorRegistrationPageComponent]
    });
    fixture = TestBed.createComponent(EducatorRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
