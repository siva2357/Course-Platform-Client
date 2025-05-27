import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAccountSettingsPageComponent } from './instructor-account-settings-page.component';

describe('InstructorAccountSettingsPageComponent', () => {
  let component: InstructorAccountSettingsPageComponent;
  let fixture: ComponentFixture<InstructorAccountSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAccountSettingsPageComponent]
    });
    fixture = TestBed.createComponent(InstructorAccountSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
