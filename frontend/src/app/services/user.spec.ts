import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user';
import { AuthService } from './auth';
import { vi } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;


  const authSpy = {
    getToken: vi.fn().mockReturnValue('fake-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all users', () => {
    const mockUsers = [
      { userId: 1, username: 'shubham', role: 'Admin' }
    ];

    service.getAllUsers().subscribe(res => {
      expect(res).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/User/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('should GET search users by username', () => {
    const mockUsers = [
      { userId: 2, username: 'john', role: 'User' }
    ];

    service.searchUsers('john').subscribe(res => {
      expect(res).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      'http://localhost:5209/api/User/search?username=john'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('should DELETE a user', () => {
    service.deleteUser(1).subscribe(res => {
      expect(res).toBe('User deleted.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/User/delete/1');
    expect(req.request.method).toBe('DELETE');

    req.flush('User deleted.');
  });

  it('should PUT update a user', () => {
    const updatedUser = { username: 'newname', role: 'Admin' };

    service.updateUser(1, updatedUser).subscribe(res => {
      expect(res).toBe('User updated successfully.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/User/update/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);

    req.flush('User updated successfully.');
  });

  it('should POST create a user', () => {
    const newUser = {
      username: 'testuser',
      password: 'pass123',
      role: 'User'
    };

    service.createUser(newUser).subscribe(res => {
      expect(res).toBe('User created successfully.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/User/create');
    expect(req.request.method).toBe('POST');

    req.flush('User created successfully.');
  });

  it('should include Bearer token in requests', () => {
    service.getAllUsers().subscribe();

    const req = httpMock.expectOne('http://localhost:5209/api/User/all');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush([]);
  });
});