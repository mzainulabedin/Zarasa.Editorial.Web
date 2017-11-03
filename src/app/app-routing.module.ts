import { NgModule } from '@angular/core';
import {RouterModule,  Routes} from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { state } from '@angular/animations';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/components/app/admin.component';
import { AdminHomeComponent } from './admin/components/home/admin.home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { depth: '1' } },
  { path: 'login', component: LoginComponent, data: { depth: '1' } },
  { path: 'user-detail', component: UserDetailComponent, data: { depth: '2' } },
  { path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'user', pathMatch: 'prefix'},
    {path: 'home', component: AdminHomeComponent, data: { depth: '1' } },
    {path: 'user', component: UserComponent, data: { depth: '1' }},
    {path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard], data: { depth: '2' } },
  ]},
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
