import { TestBed } from '@angular/core/testing';

import { CategoryManagementService } from './category-management.service';

describe('CategoryManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryManagementService = TestBed.get(CategoryManagementService);
    expect(service).toBeTruthy();
  });
});
