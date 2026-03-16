import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username and password on init', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('should show error message on failed login', () => {
    component.errorMsg = 'Invalid username or password.';
    expect(component.errorMsg).toBeTruthy();
  });

  it('should render login button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Log In');
  });
});