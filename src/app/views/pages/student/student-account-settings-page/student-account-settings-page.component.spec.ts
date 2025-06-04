import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountSettingsPageComponent } from './student-account-settings-page.component';

describe('StudentAccountSettingsPageComponent', () => {
  let component: StudentAccountSettingsPageComponent;
  let fixture: ComponentFixture<StudentAccountSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAccountSettingsPageComponent]
    });
    fixture = TestBed.createComponent(StudentAccountSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
