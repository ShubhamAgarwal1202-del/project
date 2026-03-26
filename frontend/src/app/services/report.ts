import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:5209/api/Report';

  constructor(private http: HttpClient) {}

  createReport(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, { responseType: 'text' });
  }

  getAllReports() {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteReport(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}