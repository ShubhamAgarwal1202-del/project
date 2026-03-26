import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private apiUrl = 'http://localhost:5209/api/Group';

  constructor(private http: HttpClient) {}

  createGroup(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, { responseType: 'text' });
  }

  getAllGroups() {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteGroup(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}