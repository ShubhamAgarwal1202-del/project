import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  errorMsg = '';

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = [...res.filter((u: any) => u.userId !== this.currentUserId && u.role !== 'Admin')];
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = 'Failed to load users: ' + err.status;
        this.cdr.detectChanges();
      }
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.loadConversation();
  }

  loadConversation() {
    this.messageService.getConversation(this.currentUserId, this.selectedUser.userId).subscribe({
      next: (res: any) => { 
        this.conversation = [...res]; 
        this.cdr.detectChanges();
      },
      error: (err) => { console.log('Conversation error:', err); }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const msg = {
      senderId: this.currentUserId,
      receiverId: this.selectedUser.userId,
      messageContent: this.newMessage
    };
    this.messageService.sendMessage(msg).subscribe({
      next: () => { 
        this.newMessage = ''; 
        this.loadConversation(); 
      },
      error: (err) => { console.log('Send error:', err); }
    });
  }
}