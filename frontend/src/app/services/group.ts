import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private apiUrl = 'http://localhost:5209/api/Group';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  createGroup(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, { headers: this.getHeaders(), responseType: 'text' });
  }

  getAllGroups() {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  deleteGroup(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }
}