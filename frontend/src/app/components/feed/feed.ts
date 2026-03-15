import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {
  posts: any[] = [];
  commentTexts: { [postId: number]: string } = {};
  postComments: { [postId: number]: any[] } = {};
  username = '';

  constructor(private postService: PostService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) { this.router.navigate(['/login']); return; }
    this.username = this.authService.getUsername();
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getApprovedPosts().subscribe({
      next: (res) => { this.posts = res; },
      error: () => {}
    });
  }

  likePost(postId: number) {
    const userId = this.authService.getUserId();
    this.postService.likePost(postId, userId).subscribe({ next: () => {}, error: () => {} });
  }

  toggleComments(postId: number) {
    if (this.postComments[postId]) {
      delete this.postComments[postId];
    } else {
      this.postService.getComments(postId).subscribe({
        next: (res) => { this.postComments[postId] = res; }
      });
    }
  }

  addComment(postId: number) {
    const content = this.commentTexts[postId];
    if (!content) return;
    const comment = { postId, userId: this.authService.getUserId(), content };
    this.postService.addComment(comment).subscribe({
      next: () => {
        this.commentTexts[postId] = '';
        this.postService.getComments(postId).subscribe(res => this.postComments[postId] = res);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}