import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePost {
  content = '';
  successMsg = '';
  errorMsg = '';

  constructor(private postService: PostService, private authService: AuthService, private router: Router) {}

  submit() {
    if (!this.content.trim()) { this.errorMsg = 'Post content cannot be empty.'; return; }
    const post = { userId: this.authService.getUserId(), content: this.content, status: 'Pending' };
    this.postService.createPost(post).subscribe({
      next: () => {
        this.successMsg = 'Post submitted for admin approval!';
        this.content = '';
        setTimeout(() => this.router.navigate(['/feed']), 2000);
      },
      error: () => { this.errorMsg = 'Failed to submit post.'; }
    });
  }
}