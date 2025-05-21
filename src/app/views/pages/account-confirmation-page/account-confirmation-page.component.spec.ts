import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfirmationPageComponent } from './account-confirmation-page.component';

describe('AccountConfirmationPageComponent', () => {
  let component: AccountConfirmationPageComponent;
  let fixture: ComponentFixture<AccountConfirmationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountConfirmationPageComponent]
    });
    fixture = TestBed.createComponent(AccountConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
