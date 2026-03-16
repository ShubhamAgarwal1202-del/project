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
  errorMsg = '';
  private apiUrl = 'http://localhost:5209/api/Post';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  ngOnInit() { this.loadPendingPosts(); }

  loadPendingPosts() {
    this.errorMsg = '';
    this.http.get(`${this.apiUrl}/pending`, { headers: this.getHeaders() }).subscribe({
      next: (res: any) => { 
        this.posts = res;
        if (this.posts.length === 0) this.message = 'No pending posts found.';
      },
      error: (err) => { 
        this.errorMsg = 'Failed to load posts. Status: ' + err.status;
      }
    });
  }

  approve(id: number) {
    this.http.put(`${this.apiUrl}/approve/${id}`, {}, { 
      headers: this.getHeaders(), 
      responseType: 'text' 
    }).subscribe({
      next: () => { this.message = '✅ Post approved!'; this.loadPendingPosts(); },
      error: (err) => { this.errorMsg = 'Approve failed: ' + err.status; }
    });
  }

  reject(id: number) {
    this.http.put(`${this.apiUrl}/reject/${id}`, {}, { 
      headers: this.getHeaders(), 
      responseType: 'text' 
    }).subscribe({
      next: () => { this.message = '❌ Post rejected.'; this.loadPendingPosts(); },
      error: (err) => { this.errorMsg = 'Reject failed: ' + err.status; }
    });
  }
}