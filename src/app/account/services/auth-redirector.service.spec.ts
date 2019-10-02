import { TestBed } from '@angular/core/testing';

import { AuthRedirectorService } from './auth-redirector.service';

describe('AuthRedirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRedirectorService = TestBed.get(AuthRedirectorService);
    expect(service).toBeTruthy();
  });
});
