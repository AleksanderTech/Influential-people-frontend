import { TestBed } from '@angular/core/testing';

import { HeroManagementService } from './hero-management.service';

describe('HeroManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroManagementService = TestBed.get(HeroManagementService);
    expect(service).toBeTruthy();
  });
});
