import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Messages } from './messages';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Messages', () => {
  let component: Messages;
  let fixture: ComponentFixture<Messages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messages],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(Messages);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});