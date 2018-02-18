import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JournalService } from '../../website/services/journal.service';
import { JournalRegisterComponent } from '../../website/components/journal/journal-register.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigator',
  template: 'loading....',
})
export class NavigatorComponent implements OnInit {

  constructor(private router: Router, private routerModule: RouterModule,
    private journalService: JournalService, private location: Location) {
  }

  async ngOnInit() {
    console.log('navigator');
    if (localStorage.getItem('journalRoutes') === null) {
      const data = await this.routeJournals();
      localStorage.setItem('journalRoutes', JSON.stringify(data));
      // console.log(data);
      const url = this.router.url;
      // const firstPartUrl = url.replace('/','').split('/')[0];
      let isUrlExists = false;
      data.forEach((journal, index) => {
        if(url.toLowerCase() == '/' + journal.code.toLowerCase() + '/register') {
          isUrlExists = true;
        }
        this.router.config.push({ path: journal.code.toLowerCase() + '/register',
        component: JournalRegisterComponent,
          data: { depth: '1' } });
      });

      this.router.config.forEach((x, i) => {
        // console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
        if ('/' + x.path == url) {
          isUrlExists = true;
        }
      });

      console.log('redirecting back to original');

      console.log(url);
      this.router.resetConfig(this.router.config);
      // this.router.navigateByUrl(url);
      // this.router.navigate([url]);
      if(isUrlExists){
        window.location.href = url;
      } else {
        this.router.navigate(['404']);
      }
    }

  }

  async routeJournals() {
    const response = await this.journalService.getJournalCodes().toPromise();
    return response.data;
  }
}
