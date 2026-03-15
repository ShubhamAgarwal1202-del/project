import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5209/api/User';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  searchUsers(username: string) {
    return this.http.get(`${this.apiUrl}/search?username=${username}`, { headers: this.getHeaders() });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { headers: this.getHeaders(), responseType: 'text' });
  }

  createUser(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, { headers: this.getHeaders(), responseType: 'text' });
  }
}