import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReturnToRetailComponent } from './order-return-to-retail.component';

describe('OrderReturnToRetailComponent', () => {
  let component: OrderReturnToRetailComponent;
  let fixture: ComponentFixture<OrderReturnToRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReturnToRetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReturnToRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
