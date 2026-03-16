import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:5209/api/Post';
  private likeUrl = 'http://localhost:5209/api/LikeComment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  getApprovedPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/approved`, { headers: this.getHeaders() });
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, post, { headers: this.getHeaders(), responseType: 'text' });
  }

  likePost(postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.likeUrl}/like`, { postId, userId }, { headers: this.getHeaders(), responseType: 'text' });
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.likeUrl}/comments/${postId}`, { headers: this.getHeaders() });
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.likeUrl}/comment`, comment, { headers: this.getHeaders(), responseType: 'text' });
  }

  getLikeCount(postId: number): Observable<any> {
  return this.http.get(`${this.likeUrl}/likes/${postId}`, { headers: this.getHeaders() });
  }

  unlikePost(postId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.likeUrl}/unlike`, { 
      body: { postId, userId }, 
      headers: this.getHeaders(), 
      responseType: 'text' 
    });
  }
}