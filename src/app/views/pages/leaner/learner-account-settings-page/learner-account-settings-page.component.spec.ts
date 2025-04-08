import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerAccountSettingsPageComponent } from './learner-account-settings-page.component';

describe('LearnerAccountSettingsPageComponent', () => {
  let component: LearnerAccountSettingsPageComponent;
  let fixture: ComponentFixture<LearnerAccountSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerAccountSettingsPageComponent]
    });
    fixture = TestBed.createComponent(LearnerAccountSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
