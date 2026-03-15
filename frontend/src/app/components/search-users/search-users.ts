import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { ReportService } from '../../services/report';
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
  message = '';

  constructor(private userService: UserService, private reportService: ReportService, private authService: AuthService) {}

  search() {
    if (!this.searchQuery.trim()) return;
    this.userService.searchUsers(this.searchQuery).subscribe({
      next: (res: any) => { this.users = res; }
    });
  }

  reportUser(reportedUserId: number) {
    const reason = prompt('Reason for reporting this user?');
    if (!reason) return;
    const report = { reportedUserId, reportingUserId: this.authService.getUserId(), reason };
    this.reportService.createReport(report).subscribe({
      next: () => { this.message = 'User reported successfully.'; }
    });
  }
}