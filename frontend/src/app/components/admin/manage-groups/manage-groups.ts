import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GroupService } from '../../../services/group';

@Component({
  selector: 'app-manage-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-groups.html',
  styleUrl: './manage-groups.css'
})
export class ManageGroups implements OnInit {
  groups: any[] = [];
  newGroup = { groupName: '', groupMembers: '' };
  message = '';

  constructor(private groupService: GroupService) {}

  ngOnInit() { this.loadGroups(); }

  loadGroups() {
    this.groupService.getAllGroups().subscribe({ next: (res: any) => { this.groups = res; } });
  }

  createGroup() {
    this.groupService.createGroup(this.newGroup).subscribe({
      next: () => { this.message = 'Group created!'; this.newGroup = { groupName: '', groupMembers: '' }; this.loadGroups(); }
    });
  }

  deleteGroup(id: number) {
    if (!confirm('Delete this group?')) return;
    this.groupService.deleteGroup(id).subscribe({
      next: () => { this.message = 'Group deleted.'; this.loadGroups(); }
    });
  }
}