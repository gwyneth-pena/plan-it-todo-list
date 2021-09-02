import { TestBed } from '@angular/core/testing';

import { UnAuthGuardService } from './un-auth-guard.service';

describe('UnAuthGuardService', () => {
  let service: UnAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
