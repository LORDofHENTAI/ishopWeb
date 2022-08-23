import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListFormComponent } from './order-list-form.component';

describe('OrderListFormComponent', () => {
  let component: OrderListFormComponent;
  let fixture: ComponentFixture<OrderListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
