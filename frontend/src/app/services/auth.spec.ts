import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve token', () => {
    service.saveToken('mytoken', 1, 'shubham', 'User');
    expect(service.getToken()).toBe('mytoken');
  });

  it('should return true when logged in', () => {
    service.saveToken('mytoken', 1, 'shubham', 'User');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should clear token on logout', () => {
    service.saveToken('mytoken', 1, 'shubham', 'User');
    service.logout();
    expect(service.getToken()).toBeNull();
  });

  it('should return correct role', () => {
    service.saveToken('mytoken', 1, 'shubham', 'Admin');
    expect(service.getRole()).toBe('Admin');
  });
});