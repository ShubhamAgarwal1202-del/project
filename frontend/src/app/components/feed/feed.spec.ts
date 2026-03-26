import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feed } from './feed';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { PostService } from '../../services/post';
import { AuthService } from '../../services/auth';
import { of } from 'rxjs';
import { vi } from 'vitest'; // ✅ IMPORTANT

describe('Feed Component', () => {
  let component: Feed;
  let fixture: ComponentFixture<Feed>;

  // ✅ Vitest mocks instead of jasmine
  const postServiceSpy = {
    getApprovedPosts: vi.fn().mockReturnValue(of([])),
    getLikeCount: vi.fn().mockReturnValue(of({ postId: 1, likeCount: 0 }))
  };

  const authServiceSpy = {
    isLoggedIn: vi.fn().mockReturnValue(true),
    getUsername: vi.fn().mockReturnValue('shubham'),
    getUserId: vi.fn().mockReturnValue(1),
    logout: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feed],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: PostService, useValue: postServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Feed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks(); // ✅ cleanup
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load username from AuthService on init', () => {
    expect(component.username).toBe('shubham');
  });

  it('should call getApprovedPosts on init', () => {
    expect(postServiceSpy.getApprovedPosts).toHaveBeenCalled();
  });

  it('should initialize with empty posts array', () => {
    expect(component.posts.length).toBe(0);
  });

  it('should toggle comments visibility', () => {
    component.postComments[1] = [{ commentId: 1, content: 'Test' }];

    component.toggleComments(1);

    expect(component.postComments[1]).toBeUndefined();
  });
});