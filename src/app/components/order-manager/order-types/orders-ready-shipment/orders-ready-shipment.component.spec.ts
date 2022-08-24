import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReadyShipmentComponent } from './orders-ready-shipment.component';

describe('OrdersReadyShipmentComponent', () => {
  let component: OrdersReadyShipmentComponent;
  let fixture: ComponentFixture<OrdersReadyShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersReadyShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersReadyShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
