import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from '../../services/message';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  conversation: any[] = [];
  newMessage = '';
  currentUserId = 0;

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    this.userService.getAllUsers().subscribe({
      next: (res: any) => { this.users = res.filter((u: any) => u.userId !== this.currentUserId); }
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.loadConversation();
  }

  loadConversation() {
    this.messageService.getConversation(this.currentUserId, this.selectedUser.userId).subscribe({
      next: (res: any) => { this.conversation = res; }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const msg = { senderId: this.currentUserId, receiverId: this.selectedUser.userId, messageContent: this.newMessage };
    this.messageService.sendMessage(msg).subscribe({
      next: () => { this.newMessage = ''; this.loadConversation(); }
    });
  }
}