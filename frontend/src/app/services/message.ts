import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:5209/api/Message';

  constructor(private http: HttpClient) {}

  sendMessage(data: any) {
    return this.http.post(`${this.apiUrl}/send`, data, { responseType: 'text' });
  }

  getConversation(senderId: number, receiverId: number) {
    return this.http.get(`${this.apiUrl}/conversation?senderId=${senderId}&receiverId=${receiverId}`);
  }

  getInbox(userId: number) {
    return this.http.get(`${this.apiUrl}/inbox/${userId}`);
  }
}