import { TestBed } from '@angular/core/testing';

import { FullLoadService } from './full-load.service';

describe('FullLoadService', () => {
  let service: FullLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
