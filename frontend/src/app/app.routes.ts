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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'feed', component: Feed },
  { path: 'create-post', component: CreatePost },
  { path: 'messages', component: Messages },
  { path: 'search', component: SearchUsers },
  { path: 'admin', component: AdminDashboard },
  { path: 'admin/users', component: ManageUsers },
  { path: 'admin/posts', component: ApprovePosts },
  { path: 'admin/reported', component: ReportedUsers },
  { path: 'admin/groups', component: ManageGroups },
];