import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileSettingsComponent } from './patient-profile-settings.component';

describe('PatientProfileSettingsComponent', () => {
  let component: PatientProfileSettingsComponent;
  let fixture: ComponentFixture<PatientProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
