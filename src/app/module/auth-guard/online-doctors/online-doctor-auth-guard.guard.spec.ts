import { TestBed } from '@angular/core/testing';

import { OnlineDoctorAuthGuardGuard } from './online-doctor-auth-guard.guard';

describe('OnlineDoctorAuthGuardGuard', () => {
  let guard: OnlineDoctorAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlineDoctorAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
