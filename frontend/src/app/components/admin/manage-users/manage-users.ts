import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css'
})
export class ManageUsers implements OnInit {
  users: any[] = [];
  newUser = { username: '', password: '', role: 'User' };
  editingUser: any = null;
  message = '';

  constructor(private userService: UserService) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.userService.getAllUsers().subscribe({ next: (res: any) => { this.users = res; } });
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => { this.message = 'User created!'; this.newUser = { username: '', password: '', role: 'User' }; this.loadUsers(); }
    });
  }

  deleteUser(id: number) {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(id).subscribe({ next: () => { this.message = 'User deleted!'; this.loadUsers(); } });
  }

  startEdit(user: any) { this.editingUser = { ...user }; }

  saveEdit() {
    this.userService.updateUser(this.editingUser.userId, this.editingUser).subscribe({
      next: () => { this.message = 'User updated!'; this.editingUser = null; this.loadUsers(); }
    });
  }
}