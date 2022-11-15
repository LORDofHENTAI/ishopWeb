import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupToArticleComponent } from './group-to-article.component';

describe('GroupToArticleComponent', () => {
  let component: GroupToArticleComponent;
  let fixture: ComponentFixture<GroupToArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupToArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupToArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
