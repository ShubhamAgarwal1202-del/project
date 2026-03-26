import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // 🔥 IMPORTANT
  imports: [CommonModule, RouterModule], // 🔥 REQUIRED
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(res => {
      this.unreadCount = res.filter(n => !n.isRead).length;
    });
  }
}