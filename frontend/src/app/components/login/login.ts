import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token, res.userId, res.username, res.role);
          if (res.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/feed']);
          }
        },
        error: () => { this.errorMsg = 'Invalid username or password.'; }
      });
  }
}