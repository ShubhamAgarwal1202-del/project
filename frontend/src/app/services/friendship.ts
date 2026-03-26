import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FriendshipService {

  private apiUrl = 'http://localhost:5209/api/Friendship';

  constructor(private http: HttpClient) {}


  sendRequest(requesterId: number, receiverId: number) {
    return this.http.post(
      `${this.apiUrl}/send`,
      { requesterId, receiverId },
      { responseType: 'text' }
    );
  }


  acceptRequest(id: number) {
    return this.http.put(
      `${this.apiUrl}/accept/${id}`,
      {},
      { responseType: 'text' }
    );
  }


  rejectOrUnfriend(id: number) {
    return this.http.delete(
      `${this.apiUrl}/reject/${id}`,
      { responseType: 'text' }
    );
  }


  getFriends(userId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/friends/${userId}`
    );
  }


  getFriendRequests(userId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/requests/${userId}`
  );
}


  getStatus(userId: number, otherUserId: number) {
    return this.http.get<any>(
      `${this.apiUrl}/status?userId=${userId}&otherUserId=${otherUserId}`
    );
  }
}