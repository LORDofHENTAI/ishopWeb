import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReadyBuildComponent } from './orders-ready-build.component';

describe('OrdersReadyBuildComponent', () => {
  let component: OrdersReadyBuildComponent;
  let fixture: ComponentFixture<OrdersReadyBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersReadyBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersReadyBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
