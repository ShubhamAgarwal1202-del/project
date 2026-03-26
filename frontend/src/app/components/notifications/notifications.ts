import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html'
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];

  constructor(private service: NotificationService) {}

  ngOnInit() {
    this.service.getNotifications().subscribe(res => {
      this.notifications = res;
    });
  }
}