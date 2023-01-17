import { TestBed } from '@angular/core/testing';

import { DataInvoiceService } from './data-invoice.service';

describe('DataInvoiceService', () => {
  let service: DataInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
