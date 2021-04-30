import { TestBed } from '@angular/core/testing';

import { OnlineConsultGuard } from './online-consult.guard';

describe('OnlineConsultGuard', () => {
  let guard: OnlineConsultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlineConsultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
