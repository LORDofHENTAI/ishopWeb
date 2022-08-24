import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFormComponent } from './empty-form.component';

describe('EmptyFormComponent', () => {
  let component: EmptyFormComponent;
  let fixture: ComponentFixture<EmptyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
