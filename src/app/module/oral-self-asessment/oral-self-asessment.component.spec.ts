import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralSelfAsessmentComponent } from './oral-self-asessment.component';

describe('OralSelfAsessmentComponent', () => {
  let component: OralSelfAsessmentComponent;
  let fixture: ComponentFixture<OralSelfAsessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralSelfAsessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OralSelfAsessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
