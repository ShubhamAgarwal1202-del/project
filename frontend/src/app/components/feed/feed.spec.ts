import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feed } from './feed';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Feed', () => {
  let component: Feed;
  let fixture: ComponentFixture<Feed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feed],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(Feed);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});