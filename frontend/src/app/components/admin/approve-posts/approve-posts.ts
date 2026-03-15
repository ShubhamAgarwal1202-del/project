import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-approve-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './approve-posts.html',
  styleUrl: './approve-posts.css'
})
export class ApprovePosts implements OnInit {
  posts: any[] = [];
  message = '';
  private apiUrl = 'http://localhost:5209/api/Post';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  ngOnInit() { this.loadPendingPosts(); }

  loadPendingPosts() {
    this.http.get(`${this.apiUrl}/pending`, { headers: this.getHeaders() }).subscribe({
      next: (res: any) => { this.posts = res; }
    });
  }

  approve(id: number) {
    this.http.put(`${this.apiUrl}/approve/${id}`, {}, { headers: this.getHeaders(), responseType: 'text' }).subscribe({
      next: () => { this.message = 'Post approved!'; this.loadPendingPosts(); }
    });
  }

  reject(id: number) {
    this.http.put(`${this.apiUrl}/reject/${id}`, {}, { headers: this.getHeaders(), responseType: 'text' }).subscribe({
      next: () => { this.message = 'Post rejected.'; this.loadPendingPosts(); }
    });
  }
}