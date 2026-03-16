import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../../services/report';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-reported-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reported-users.html',
  styleUrl: './reported-users.css'
})
export class ReportedUsers implements OnInit {
  reports: any[] = [];
  users: { [id: number]: string } = {};
  message = '';

  constructor(
    private reportService: ReportService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        res.forEach((u: any) => this.users[u.userId] = u.username);
        this.loadReports();
      }
    });
  }

  loadReports() {
    this.reportService.getAllReports().subscribe({
      next: (res: any) => {
        this.reports = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => { console.log('Error:', err); }
    });
  }

  dismiss(id: number) {
    this.reportService.deleteReport(id).subscribe({
      next: () => { this.message = 'Report dismissed.'; this.loadReports(); }
    });
  }

  getUsername(id: number): string {
    return this.users[id] ? `${this.users[id]} (#${id})` : `User #${id}`;
  }
}