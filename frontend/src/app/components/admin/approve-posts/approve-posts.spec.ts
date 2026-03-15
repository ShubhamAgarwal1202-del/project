import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovePosts } from './approve-posts';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ApprovePosts', () => {
  let component: ApprovePosts;
  let fixture: ComponentFixture<ApprovePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovePosts],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(ApprovePosts);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});