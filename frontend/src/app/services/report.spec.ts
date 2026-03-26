import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report';
import { AuthService } from './auth';
import { vi } from 'vitest'; 

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;

  const authSpy = {
    getToken: vi.fn().mockReturnValue('fake-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ReportService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks(); // ✅ cleanup
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST create a report', () => {
    const report = {
      reportedUserId: 2,
      reportingUserId: 1,
      reason: 'Spam'
    };

    service.createReport(report).subscribe(res => {
      expect(res).toBe('User reported successfully.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Report/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(report);

    req.flush('User reported successfully.');
  });

  it('should GET all reports', () => {
    const mockReports = [
      { reportId: 1, reportedUserId: 2, reportingUserId: 1, reason: 'Spam' }
    ];

    service.getAllReports().subscribe(res => {
      expect(res).toEqual(mockReports);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Report/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockReports);
  });

  it('should DELETE dismiss a report', () => {
    service.deleteReport(1).subscribe(res => {
      expect(res).toBe('Report deleted.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Report/delete/1');
    expect(req.request.method).toBe('DELETE');

    req.flush('Report deleted.');
  });
});