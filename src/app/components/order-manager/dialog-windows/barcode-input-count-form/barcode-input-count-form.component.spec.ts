import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInputCountFormComponent } from './barcode-input-count-form.component';

describe('BarcodeInputCountFormComponent', () => {
  let component: BarcodeInputCountFormComponent;
  let fixture: ComponentFixture<BarcodeInputCountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeInputCountFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeInputCountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
