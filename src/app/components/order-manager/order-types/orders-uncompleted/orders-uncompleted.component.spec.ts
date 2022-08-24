import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUncompletedComponent } from './orders-uncompleted.component';

describe('OrdersUncompletedComponent', () => {
  let component: OrdersUncompletedComponent;
  let fixture: ComponentFixture<OrdersUncompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersUncompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersUncompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
