import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePosts } from './approve-posts';

describe('ApprovePosts', () => {
  let component: ApprovePosts;
  let fixture: ComponentFixture<ApprovePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovePosts],
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovePosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
