import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupService } from './group';
import { AuthService } from './auth';
import { vi } from 'vitest'; 

describe('GroupService', () => {
  let service: GroupService;
  let httpMock: HttpTestingController;

  const authSpy = {
    getToken: vi.fn().mockReturnValue('fake-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GroupService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(GroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST create a group', () => {
    const group = { groupName: 'Dev Team', groupMembers: 'Alice, Bob' };

    service.createGroup(group).subscribe(res => {
      expect(res).toBe('Group created successfully.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Group/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(group);

    req.flush('Group created successfully.');
  });

  it('should GET all groups', () => {
    const mockGroups = [
      { groupId: 1, groupName: 'Dev Team', groupMembers: 'Alice, Bob' }
    ];

    service.getAllGroups().subscribe(res => {
      expect(res).toEqual(mockGroups);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Group/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockGroups);
  });

  it('should DELETE a group by id', () => {
    service.deleteGroup(1).subscribe(res => {
      expect(res).toBe('Group deleted.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Group/delete/1');
    expect(req.request.method).toBe('DELETE');

    req.flush('Group deleted.');
  });

  it('should include Authorization header', () => {
    service.getAllGroups().subscribe();

    const req = httpMock.expectOne('http://localhost:5209/api/Group/all');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush([]);
  });
});