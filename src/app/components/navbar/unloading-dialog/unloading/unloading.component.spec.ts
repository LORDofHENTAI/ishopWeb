import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadingComponent } from './unloading.component';

describe('UnloadingComponent', () => {
  let component: UnloadingComponent;
  let fixture: ComponentFixture<UnloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
