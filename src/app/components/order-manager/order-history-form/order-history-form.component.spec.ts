import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryFormComponent } from './order-history-form.component';

describe('OrderHistoryFormComponent', () => {
  let component: OrderHistoryFormComponent;
  let fixture: ComponentFixture<OrderHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
