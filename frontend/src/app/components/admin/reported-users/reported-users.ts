import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../../services/report';

@Component({
  selector: 'app-reported-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reported-users.html',
  styleUrl: './reported-users.css'
})
export class ReportedUsers implements OnInit {
  reports: any[] = [];
  message = '';

  constructor(private reportService: ReportService) {}

  ngOnInit() { this.loadReports(); }

  loadReports() {
    this.reportService.getAllReports().subscribe({ next: (res: any) => { this.reports = res; } });
  }

  dismiss(id: number) {
    this.reportService.deleteReport(id).subscribe({
      next: () => { this.message = 'Report dismissed.'; this.loadReports(); }
    });
  }
}