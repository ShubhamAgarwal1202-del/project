import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { Feed } from './components/feed/feed';
import { CreatePost } from './components/create-post/create-post';
import { Messages } from './components/messages/messages';
import { SearchUsers } from './components/search-users/search-users';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { ManageUsers } from './components/admin/manage-users/manage-users';
import { ApprovePosts } from './components/admin/approve-posts/approve-posts';
import { ReportedUsers } from './components/admin/reported-users/reported-users';
import { ManageGroups } from './components/admin/manage-groups/manage-groups';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth';
import { FriendRequests } from './components/friend-requests/friend-requests';
import { NotificationsComponent } from './components/notifications/notifications';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn() && authService.getRole() === 'Admin') return true;
  router.navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'feed', component: Feed, canActivate: [authGuard] },
  { path: 'create-post', component: CreatePost, canActivate: [authGuard] },
  { path: 'messages', component: Messages, canActivate: [authGuard] },
  { path: 'search', component: SearchUsers, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'admin/users', component: ManageUsers, canActivate: [adminGuard] },
  { path: 'admin/posts', component: ApprovePosts, canActivate: [adminGuard] },
  { path: 'admin/reported', component: ReportedUsers, canActivate: [adminGuard] },
  { path: 'admin/groups', component: ManageGroups, canActivate: [adminGuard] },
  { path: 'friend-requests', component: FriendRequests, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsComponent },
];