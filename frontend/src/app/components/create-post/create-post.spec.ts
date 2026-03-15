import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePost } from './create-post';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CreatePost', () => {
  let component: CreatePost;
  let fixture: ComponentFixture<CreatePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePost],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(CreatePost);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});