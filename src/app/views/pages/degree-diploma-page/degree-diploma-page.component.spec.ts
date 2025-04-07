import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDiplomaPageComponent } from './degree-diploma-page.component';

describe('DegreeDiplomaPageComponent', () => {
  let component: DegreeDiplomaPageComponent;
  let fixture: ComponentFixture<DegreeDiplomaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeDiplomaPageComponent]
    });
    fixture = TestBed.createComponent(DegreeDiplomaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
