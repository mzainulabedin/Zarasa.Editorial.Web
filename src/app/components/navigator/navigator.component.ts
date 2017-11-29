import { Component, HostBinding } from '@angular/core';
// import { fadeInAnimation } from '../../animations/fade-in-animation';
import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { JournalRegisterComponent } from '../journal/journal-register.component';
import { Location } from '@angular/common';

@Component({
    selector: 'app-navigator',
    template: 'loading....',
    // templateUrl: './home.component.html',
    // animations: [fadeInAnimation]
})


export class NavigatorComponent implements OnInit  {
  // @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position') position = 'relative';

  constructor(private router: Router, private routerModule: RouterModule,
    private journalService: JournalService, private location: Location) {
  }

  async ngOnInit() {
    console.log('navigator');
    if (localStorage.getItem('journalRoutes') === null) {
      const data = await this.routeJournals();
      localStorage.setItem('journalRoutes', JSON.stringify(data));
      // console.log(data);

      data.forEach((journal, index) => {
        this.router.config.push({ path: journal.code.toLowerCase(), // + '/register',
        component: JournalRegisterComponent,
          data: { depth: '1' } });
      });

      this.router.config.forEach((x, i) => {
        console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
      });

      console.log('redirecting back to original');
      const url = this.router.url;
      console.log(url);
      // this.router.navigate([url]);
      window.location.href = url;
    }

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
