import { TestBed } from '@angular/core/testing';

import { PatientAuthGuardGuard } from './patient-auth-guard.guard';

describe('PatientAuthGuardGuard', () => {
  let guard: PatientAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
