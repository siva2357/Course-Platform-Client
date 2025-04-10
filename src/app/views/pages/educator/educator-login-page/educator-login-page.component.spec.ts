import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorLoginPageComponent } from './educator-login-page.component';

describe('EducatorLoginPageComponent', () => {
  let component: EducatorLoginPageComponent;
  let fixture: ComponentFixture<EducatorLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorLoginPageComponent]
    });
    fixture = TestBed.createComponent(EducatorLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
