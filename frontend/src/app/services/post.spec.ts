import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post';
import { AuthService } from './auth';
import { vi } from 'vitest';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const authSpy = {
    getToken: vi.fn().mockReturnValue('fake-jwt-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET approved posts', () => {
    const mockPosts = [
      { postId: 1, userId: 1, content: 'Hello', status: 'Approved' }
    ];

    service.getApprovedPosts().subscribe(res => {
      expect(res).toEqual(mockPosts);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Post/approved');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-jwt-token');

    req.flush(mockPosts);
  });

  it('should POST create a new post', () => {
    const newPost = { userId: 1, content: 'Test post', status: 'Pending' };

    service.createPost(newPost).subscribe(res => {
      expect(res).toBe('Post submitted for approval.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Post/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);

    req.flush('Post submitted for approval.');
  });

  it('should GET like count for a post', () => {
    service.getLikeCount(1).subscribe(res => {
      expect((res as any).likeCount).toBe(5);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/LikeComment/likes/1');
    expect(req.request.method).toBe('GET');

    req.flush({ postId: 1, likeCount: 5 });
  });

  it('should POST like a post', () => {
    service.likePost(1, 2).subscribe(res => {
      expect(res).toBe('Post liked.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/LikeComment/like');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ postId: 1, userId: 2 });

    req.flush('Post liked.');
  });

  it('should DELETE unlike a post', () => {
    service.unlikePost(1, 2).subscribe(res => {
      expect(res).toBe('Post unliked.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/LikeComment/unlike');
    expect(req.request.method).toBe('DELETE');

    req.flush('Post unliked.');
  });

  it('should GET comments for a post', () => {
    const mockComments = [
      { commentId: 1, postId: 1, userId: 2, content: 'Nice!' }
    ];

    service.getComments(1).subscribe(res => {
      expect(res).toEqual(mockComments);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/LikeComment/comments/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockComments);
  });

  it('should POST add a comment', () => {
    const comment = { postId: 1, userId: 2, content: 'Great post!' };

    service.addComment(comment).subscribe(res => {
      expect(res).toBe('Comment added.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/LikeComment/comment');
    expect(req.request.method).toBe('POST');

    req.flush('Comment added.');
  });
});