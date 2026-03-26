import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message';
import { AuthService } from './auth';
import { vi } from 'vitest';

describe('MessageService', () => {
  let service: MessageService;
  let httpMock: HttpTestingController;


  const authSpy = {
    getToken: vi.fn().mockReturnValue('fake-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MessageService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST send a message', () => {
    const msg = { senderId: 1, receiverId: 2, messageContent: 'Hello!' };

    service.sendMessage(msg).subscribe(res => {
      expect(res).toBe('Message sent successfully.');
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Message/send');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(msg);

    req.flush('Message sent successfully.');
  });

  it('should GET conversation between two users', () => {
    const mockMsgs = [
      { messageId: 1, senderId: 1, receiverId: 2, messageContent: 'Hi' }
    ];

    service.getConversation(1, 2).subscribe(res => {
      expect(res).toEqual(mockMsgs);
    });

    const req = httpMock.expectOne(
      'http://localhost:5209/api/Message/conversation?senderId=1&receiverId=2'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockMsgs);
  });

  it('should GET inbox for a user', () => {
    const mockInbox = [
      { messageId: 2, senderId: 3, receiverId: 1, messageContent: 'Hey' }
    ];

    service.getInbox(1).subscribe(res => {
      expect(res).toEqual(mockInbox);
    });

    const req = httpMock.expectOne('http://localhost:5209/api/Message/inbox/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockInbox);
  });
});