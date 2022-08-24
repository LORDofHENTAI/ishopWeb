import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInAssemblyComponent } from './orders-in-assembly.component';

describe('OrdersInAssemblyComponent', () => {
  let component: OrdersInAssemblyComponent;
  let fixture: ComponentFixture<OrdersInAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersInAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersInAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
