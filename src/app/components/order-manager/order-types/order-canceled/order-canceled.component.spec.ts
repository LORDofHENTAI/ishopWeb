import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCanceledComponent } from './order-canceled.component';

describe('OrderCanceledComponent', () => {
  let component: OrderCanceledComponent;
  let fixture: ComponentFixture<OrderCanceledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCanceledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
