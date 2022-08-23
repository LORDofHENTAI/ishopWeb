import { TestBed } from '@angular/core/testing';

import { SnakebarService } from './snakebar.service';

describe('SnakebarService', () => {
  let service: SnakebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
