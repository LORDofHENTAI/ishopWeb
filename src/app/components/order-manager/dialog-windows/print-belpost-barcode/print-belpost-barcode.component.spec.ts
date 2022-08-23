import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBelpostBarcodeComponent } from './print-belpost-barcode.component';

describe('PrintBelpostBarcodeComponent', () => {
  let component: PrintBelpostBarcodeComponent;
  let fixture: ComponentFixture<PrintBelpostBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBelpostBarcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBelpostBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
