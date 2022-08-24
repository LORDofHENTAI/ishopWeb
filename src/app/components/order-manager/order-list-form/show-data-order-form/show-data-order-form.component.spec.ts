import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataOrderFormComponent } from './show-data-order-form.component';

describe('ShowDataOrderFormComponent', () => {
  let component: ShowDataOrderFormComponent;
  let fixture: ComponentFixture<ShowDataOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDataOrderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDataOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
