import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerProfileSettingsPageComponent } from './learner-profile-settings-page.component';

describe('LearnerProfileSettingsPageComponent', () => {
  let component: LearnerProfileSettingsPageComponent;
  let fixture: ComponentFixture<LearnerProfileSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerProfileSettingsPageComponent]
    });
    fixture = TestBed.createComponent(LearnerProfileSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
