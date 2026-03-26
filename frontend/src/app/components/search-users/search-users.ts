import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { ReportService } from '../../services/report';
import { FriendshipService } from '../../services/friendship';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-users.html',
  styleUrl: './search-users.css'
})
export class SearchUsers {
  searchQuery = '';
  users: any[] = [];
  // tracks friendship status per userId: 'None' | 'Pending' | 'Accepted'
  friendStatus: { [userId: number]: any } = {};
  message = '';
  currentUserId = 0;

  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private friendshipService: FriendshipService,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.getUserId();
  }

  search() {
    if (!this.searchQuery.trim()) return;
    this.userService.searchUsers(this.searchQuery).subscribe({
      next: (res: any) => {
        // exclude self and admins from results
        this.users = res.filter((u: any) =>
          u.userId !== this.currentUserId && u.role !== 'Admin'
        );
        // load friendship status for each result
        this.users.forEach(u => this.loadStatus(u.userId));
      }
    });
  }

  loadStatus(otherUserId: number) {
    this.friendshipService.getStatus(this.currentUserId, otherUserId).subscribe({
      next: (res) => { this.friendStatus[otherUserId] = res; }
    });
  }

  addFriend(userId: number) {
    this.friendshipService.sendRequest(this.currentUserId, userId).subscribe({
      next: () => {
        this.message = 'Friend request sent!';
        this.loadStatus(userId);
      },
      error: (err) => { this.message = err.error || 'Could not send request.'; }
    });
  }

  unfriend(userId: number) {
    const id = this.friendStatus[userId]?.friendshipId;
    if (!id) return;
    this.friendshipService.rejectOrUnfriend(id).subscribe({
      next: () => {
        this.message = 'Removed from friends.';
        this.loadStatus(userId);
      }
    });
  }

  reportUser(reportedUserId: number) {
    const reason = prompt('Reason for reporting this user?');
    if (!reason) return;
    const report = { reportedUserId, reportingUserId: this.currentUserId, reason };
    this.reportService.createReport(report).subscribe({
      next: () => { this.message = 'User reported successfully.'; }
    });
  }

  getButtonLabel(userId: number): string {
    const s = this.friendStatus[userId];
    if (!s || s.status === 'None') return 'Add Friend';
    if (s.status === 'Pending' && s.iRequested) return 'Requested';
    if (s.status === 'Pending' && !s.iRequested) return 'Respond';
    if (s.status === 'Accepted') return 'Friends ✓';
    return 'Add Friend';
  }
}