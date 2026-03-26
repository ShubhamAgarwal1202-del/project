import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5209/api/User';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/all`);
  }

  searchUsers(username: string) {
    return this.http.get(`${this.apiUrl}/search?username=${username}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { responseType: 'text' });
  }

  createUser(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, { responseType: 'text' });
  }
}