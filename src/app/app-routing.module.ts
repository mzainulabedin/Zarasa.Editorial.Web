import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

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
import { JournalRequestComponent } from './website/components/journal/journal-request.component';
import { NavigatorComponent } from './common/components/navigator.component';
import { JournalService } from './website/services/journal.service';
import { JournalRegisterComponent } from './website/components/journal/journal-register.component';
import { Error404Component } from './common/components/error.404.component';

const routes: Routes = [

  {
    path: '', component: WebLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { depth: '1' } },
      { path: 'journal', component: JournalComponent, data: { depth: '1' } },
      { path: 'about', component: AboutComponent, data: { depth: '1' } },
      { path: 'login', component: LoginComponent, data: { depth: '1' } },
      { path: 'journal-request', component: JournalRequestComponent, data: { depth: '2' } },
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', component: AdminHomeComponent, data: { depth: '1' } },
      { path: 'user', component: AdminUserComponent, data: { depth: '2' } },
      { path: 'user-detail', component: AdminUserDetailComponent, data: { depth: '2' } },
      { path: 'user-detail/:id', component: AdminUserDetailComponent, data: { depth: '1' } },
      { path: 'journal', component: AdminJournalComponent, data: { depth: '1' } },
    ]
  },
  { path: '404', component: Error404Component },
  // { path: '**', component: NavigatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router, private routerModule: RouterModule, private journalService: JournalService) {
    if (localStorage.getItem('journalRoutes') !== null) {
      console.log('data already there');
      const data = JSON.parse(localStorage.getItem('journalRoutes'));
      data.forEach((journal, index) => {
        this.router.config.push({
          path: journal.code.toLowerCase() + '/register', component: JournalRegisterComponent,
          data: { depth: '1' }
        });
      });
      router.config.push({
        path: '**', component: NavigatorComponent, data: { depth: '1', url: router.url }
      });
      // localStorage.removeItem('journalRoutes');
    } else {
      console.log('no data');
      router.config.push({
        path: '**', component: NavigatorComponent, data: { depth: '1', url: router.url }
      });
    }
  }
}
