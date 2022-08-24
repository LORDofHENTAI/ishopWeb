import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPrintFormComponent } from './order-print-form.component';

describe('OrderPrintFormComponent', () => {
  let component: OrderPrintFormComponent;
  let fixture: ComponentFixture<OrderPrintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPrintFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPrintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
