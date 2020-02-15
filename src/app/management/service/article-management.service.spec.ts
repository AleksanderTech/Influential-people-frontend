import { TestBed } from '@angular/core/testing';

import { ArticleManagementService } from './article-management.service';

describe('ArticleManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleManagementService = TestBed.get(ArticleManagementService);
    expect(service).toBeTruthy();
  });
});
