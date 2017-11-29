import { NgModule, Injectable } from '@angular/core';
import {RouterStateSnapshot, ActivatedRouteSnapshot,  Resolve,   RouterModule,    Routes,    Router} from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { UserComponent } from './admin/components/user/user.component';
import { UserDetailComponent } from './admin/components/user/user-detail.component';
// import { state } from '@angular/animations';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/components/app/admin.component';
import { AdminHomeComponent } from './admin/components/home/admin.home.component';
import { JournalComponent } from './components/journal/journal.component';
import { JournalAdminComponent } from './admin/components/journal/journal.component';
import { JournalService } from './services/journal.service';
import { JournalRequestComponent } from './components/journal/journal-request.component';
import { JournalRegisterComponent } from './components/journal/journal-register.component';
import { EntityListResponse } from './common/entity-list-response';
import { Journal } from './models/journal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Route } from '@angular/router/src/config';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavigatorComponent } from './components/navigator/navigator.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'navigator', component: NavigatorComponent, data: { depth: '1' } },
  { path: 'home', component: HomeComponent, data: { depth: '1' } },
  { path: 'journal', component: JournalComponent, data: { depth: '1' }},
  { path: 'journal-request', component: JournalRequestComponent, data: { depth: '2' } },
  { path: 'journal-register', component: JournalRegisterComponent, data: { depth: '1' } },
  { path: 'login', component: LoginComponent, data: { depth: '1' } },

  { path: 'admin', component: AdminComponent, children: [
    { path: '', redirectTo: 'user', pathMatch: 'prefix'},
    { path: 'home', component: AdminHomeComponent, data: { depth: '1' } },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { depth: '1' }},
    { path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard], data: { depth: '2' } },
    { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard], data: { depth: '2' } },
    { path: 'journal', component: JournalAdminComponent, canActivate: [AuthGuard], data: { depth: '1' }},
  ]},
  // { path: '**', redirectTo: 'navigator'}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

  constructor(private router: Router, private routerModule: RouterModule, private journalService: JournalService) {
    if (localStorage.getItem('journalRoutes') === null ) {
      console.log('redirecting to navigator');
      router.config.push({ path: '**', component: NavigatorComponent,
        data: { depth: '1', url: router.url } });
    } else {
      console.log('data already there');
      const data = JSON.parse( localStorage.getItem('journalRoutes'));
      data.forEach((journal, index) => {
            this.router.config.push({ path: journal.code.toLowerCase() + '/register', component: JournalRegisterComponent,
              data: { depth: '1' } });
          });
    }



    // console.log('Routes: ', JSON.stringify(this.router.config, undefined, 1));
    // const data = await this.routeJournals();
    // console.log(data);
    // data.forEach((journal, index) => {
    //     this.router.config.push({ path: journal.code.toLowerCase() + '/register', component: JournalRegisterComponent,
    //       data: { depth: '1' } });
    //   });
    // console.log('Routes: ', JSON.stringify(this.router.config, undefined, 1));
    // router.config.push({ path: 'space_research/register', component: JournalAdminComponent,
    //   canActivate: [AuthGuard], data: { depth: '1' } });
    // router.config.forEach((x, i) => {
    //     console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
    // });
  }

  async routeJournals() {
    const response = await this.journalService.getJournalCodes().toPromise();
    return response.data;
    // return response.data;
      // .subscribe(result => {
      //   // return result.data; // .forEach((journal, index) => {
      //   //   this.router.config.push({ path: journal.code.toLowerCase() + '/register', component: JournalRegisterComponent,
      //   //     data: { depth: '1' } });
      //   // });

      //   // this.router.config.forEach((x, i) => {
      //   //     console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
      //   // });
      // }, (error: Error) => {
      //   console.log(error);
      // });

  }

}

// @Injectable()
// class TeamResolver implements Resolve<any> {
//   constructor(private journalService: JournalService) {}

//   async resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
//     return this.routeJournals();
//   }

//   async routeJournals() {
//     const response = await this.journalService.getJournalCodes().toPromise();
//     return response.data;
//   }
// }
