import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorMainPageComponent } from './educator-main-page.component';

describe('EducatorMainPageComponent', () => {
  let component: EducatorMainPageComponent;
  let fixture: ComponentFixture<EducatorMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorMainPageComponent]
    });
    fixture = TestBed.createComponent(EducatorMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
