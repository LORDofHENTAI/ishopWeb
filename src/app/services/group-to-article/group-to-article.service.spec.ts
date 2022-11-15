import { TestBed } from '@angular/core/testing';

import { GroupToArticleService } from './group-to-article.service';

describe('GroupToArticleService', () => {
  let service: GroupToArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupToArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
