import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5209/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string, userId: number, username: string, role: string) {
    const expiresAt = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('expiresAt', expiresAt.toString());
  }

  getToken(): string | null {
    if (this.isSessionExpired()) {
      localStorage.clear();
      return null;
    }
    return localStorage.getItem('token');
  }

  isSessionExpired(): boolean {
    const expiresAt = localStorage.getItem('expiresAt');
    if (!expiresAt) return true;
    return new Date().getTime() > parseInt(expiresAt);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !this.isSessionExpired();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}