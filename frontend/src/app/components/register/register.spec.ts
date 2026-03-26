import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should initialize with empty fields', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should set error if passwords do not match', () => {
    component.password = 'pass123';
    component.confirmPassword = 'different';
    component.register();
    expect(component.errorMsg).toBe('Passwords do not match.');
  });

  it('should not submit if passwords do not match', () => {
    component.username = 'testuser';
    component.password = 'abc123';
    component.confirmPassword = 'xyz789';
    component.register();
    expect(component.successMsg).toBe('');
  });

  it('should render register button', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('button')?.textContent?.trim()).toBe('Register');
  });
});
