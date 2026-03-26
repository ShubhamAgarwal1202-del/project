import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:5209/api/Post';
  private likeUrl = 'http://localhost:5209/api/LikeComment';

  constructor(private http: HttpClient) {}

  getApprovedPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/approved`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, post, { responseType: 'text' });
  }

  likePost(postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.likeUrl}/like`, { postId, userId }, { responseType: 'text' });
  }

  unlikePost(postId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.likeUrl}/unlike`, {
      body: { postId, userId },
      responseType: 'text'
    });
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.likeUrl}/comments/${postId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.likeUrl}/comment`, comment, { responseType: 'text' });
  }

  getLikeCount(postId: number): Observable<any> {
    return this.http.get(`${this.likeUrl}/likes/${postId}`);
  }
}