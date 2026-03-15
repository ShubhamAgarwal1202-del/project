import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:5209/api/Message';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  sendMessage(data: any) {
    return this.http.post(`${this.apiUrl}/send`, data, { headers: this.getHeaders(), responseType: 'text' });
  }

  getConversation(senderId: number, receiverId: number) {
    return this.http.get(`${this.apiUrl}/conversation?senderId=${senderId}&receiverId=${receiverId}`, { headers: this.getHeaders() });
  }

  getInbox(userId: number) {
    return this.http.get(`${this.apiUrl}/inbox/${userId}`, { headers: this.getHeaders() });
  }
}