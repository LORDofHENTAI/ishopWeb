import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInvoiceDialogComponent } from './data-invoice-dialog.component';

describe('DataInvoiceDialogComponent', () => {
  let component: DataInvoiceDialogComponent;
  let fixture: ComponentFixture<DataInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataInvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
