import { TestBed } from '@angular/core/testing';

import { QuoteManagementService } from './quote-management.service';

describe('QuoteManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteManagementService = TestBed.get(QuoteManagementService);
    expect(service).toBeTruthy();
  });
});
