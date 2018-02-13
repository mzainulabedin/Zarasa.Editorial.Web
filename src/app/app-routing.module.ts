import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { WebLayoutComponent } from './website/components/layout/web.layout.component';
import { HomeComponent } from './website/components/home/home.component';
import { AboutComponent } from './website/components/about/about.component';
import { JournalComponent } from './website/components/journal/journal.component';
import { LoginComponent } from './website/components/auth/login.component';
import { AdminLayoutComponent } from './admin/components/layout/admin.layout.component';
import { AdminHomeComponent } from './admin/components/home/admin.home.component';
import { AdminUserComponent } from './admin/components/user/admin.user.component';
import { AdminUserDetailComponent } from './admin/components/user/admin.user-detail.component';
import { AdminJournalComponent } from './admin/components/journal/admin.journal.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { path: '', component: WebLayoutComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, data: { depth: '1' } },
    { path: 'journal', component: JournalComponent, data: { depth: '1' } },
    { path: 'about', component: AboutComponent, data: { depth: '1' } },
    { path: 'login', component: LoginComponent, data: { depth: '1' } },
  ]},
  { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'prefix'},
    { path: 'home', component: AdminHomeComponent, data: { depth: '1' } },
    { path: 'user', component: AdminUserComponent, data: { depth: '2' } },
    { path: 'user-detail', component: AdminUserDetailComponent, data: { depth: '2' } },
    { path: 'user-detail/:id', component: AdminUserDetailComponent, data: { depth: '1' } },
    { path: 'journal', component: AdminJournalComponent, data: { depth: '1' }},
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
