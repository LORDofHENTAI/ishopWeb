import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalIconMenuComponent } from './vertical-icon-menu.component';

describe('VerticalIconMenuComponent', () => {
  let component: VerticalIconMenuComponent;
  let fixture: ComponentFixture<VerticalIconMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalIconMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalIconMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
