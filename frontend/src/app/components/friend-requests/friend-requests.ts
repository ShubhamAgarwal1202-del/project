import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendshipService } from '../../services/friendship';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './friend-requests.html',
  styleUrls: ['./friend-requests.css']
})
export class FriendRequests implements OnInit {

  requests: any[] = [];
  friends: any[] = [];
  message: string = '';

  constructor(
    private service: FriendshipService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadFriends();
  }

  loadRequests() {
    const userId = this.authService.getUserId();
    this.service.getFriendRequests(userId).subscribe({
      next: (res) => { this.requests = res; },
      error: (err) => console.error(err)
    });
  }

  loadFriends() {
    const userId = this.authService.getUserId();
    this.service.getFriends(userId).subscribe({
      next: (res) => { this.friends = res; },
      error: (err) => console.error(err)
    });
  }

  accept(id: number) {
    this.service.acceptRequest(id).subscribe({
      next: () => {
        this.message = 'Friend request accepted!';
        this.loadRequests();
        this.loadFriends();
      }
    });
  }

  reject(id: number) {
    this.service.rejectOrUnfriend(id).subscribe({
      next: () => {
        this.message = 'Request removed.';
        this.loadRequests();
      }
    });
  }

  unfriend(userId: number) {
    const currentUserId = this.authService.getUserId();
    this.service.getStatus(currentUserId, userId).subscribe({
      next: (res) => {
        if (res.friendshipId) {
          this.service.rejectOrUnfriend(res.friendshipId).subscribe({
            next: () => {
              this.message = 'Unfriended successfully.';
              this.loadFriends();
            }
          });
        }
      }
    });
  }
}