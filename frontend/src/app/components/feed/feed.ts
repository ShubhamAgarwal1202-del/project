import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {

  posts: any[] = [];
  filteredPosts: any[] = [];
  searchKeyword = '';
  commentTexts: { [postId: number]: string } = {};
  postComments: { [postId: number]: any[] } = {};
  likeCounts: { [postId: number]: number } = {};
  likedPosts: { [postId: number]: boolean } = {};
  username = '';
  currentUserId = 0;

  unreadCount = 0; // 🔔 ADD

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private notificationService: NotificationService, // 🔔 ADD
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) { 
      this.router.navigate(['/login']); 
      return; 
    }

    this.username = this.authService.getUsername();
    this.currentUserId = this.authService.getUserId();

    this.loadPosts();
    this.loadNotifications(); // 🔔 ADD
  }

  // 🔔 ADD THIS FUNCTION
  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any[]) => {
        this.unreadCount = res?.filter(n => !n.isRead)?.length || 0;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  loadPosts() {
    this.postService.getApprovedPosts().subscribe({
      next: (res: any) => {
        this.posts = [...res];
        this.filteredPosts = [...res];
        this.posts.forEach(post => this.loadLikeCount(post.postId));
        this.cdr.detectChanges();
      },
      error: (err) => { console.log('Error:', err); }
    });
  }

  filterPosts() {
    if (!this.searchKeyword.trim()) {
      this.filteredPosts = [...this.posts];
    } else {
      const kw = this.searchKeyword.toLowerCase();
      this.filteredPosts = this.posts.filter(p =>
        p.content?.toLowerCase().includes(kw) ||
        p.username?.toLowerCase().includes(kw)
      );
    }
  }

  loadLikeCount(postId: number) {
    this.postService.getLikeCount(postId).subscribe({
      next: (res: any) => {
        this.likeCounts[postId] = res.likeCount;
        this.cdr.detectChanges();
      }
    });
  }

  likePost(postId: number) {
    if (this.likedPosts[postId]) {
      this.postService.unlikePost(postId, this.currentUserId).subscribe({
        next: () => {
          this.likedPosts[postId] = false;
          this.likeCounts[postId] = Math.max((this.likeCounts[postId] || 1) - 1, 0);
          this.cdr.detectChanges();
        }
      });
    } else {
      this.postService.likePost(postId, this.currentUserId).subscribe({
        next: () => {
          this.likedPosts[postId] = true;
          this.likeCounts[postId] = (this.likeCounts[postId] || 0) + 1;
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 400) {
            this.likedPosts[postId] = true;
          }
        }
      });
    }
  }

  toggleComments(postId: number) {
    if (this.postComments[postId]) {
      delete this.postComments[postId];
      this.cdr.detectChanges();
    } else {
      this.postService.getComments(postId).subscribe({
        next: (res: any) => {
          this.postComments[postId] = res;
          this.cdr.detectChanges();
        }
      });
    }
  }

  addComment(postId: number) {
    const content = this.commentTexts[postId];
    if (!content) return;

    const comment = { postId, userId: this.currentUserId, content };

    this.postService.addComment(comment).subscribe({
      next: () => {
        this.commentTexts[postId] = '';
        this.postService.getComments(postId).subscribe((res: any) => {
          this.postComments[postId] = res;
          this.cdr.detectChanges();
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}