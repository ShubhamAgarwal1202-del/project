import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:5209/api/Notification';

  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get<any[]>(this.apiUrl);
  }
}