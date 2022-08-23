import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateFormComponent } from './navigate-form.component';

describe('NavigateFormComponent', () => {
  let component: NavigateFormComponent;
  let fixture: ComponentFixture<NavigateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
