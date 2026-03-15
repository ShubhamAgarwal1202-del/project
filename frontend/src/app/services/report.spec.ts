import { TestBed } from '@angular/core/testing';
import { ReportService } from './report';
import { provideHttpClient } from '@angular/common/http';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});