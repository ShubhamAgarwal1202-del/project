import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportedUsers } from './reported-users';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ReportedUsers', () => {
  let component: ReportedUsers;
  let fixture: ComponentFixture<ReportedUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedUsers],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(ReportedUsers);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});