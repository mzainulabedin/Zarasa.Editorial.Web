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
    const subUrls = ['register'];
    // if (localStorage.getItem('journalRoutes') === null) {
      const data = await this.routeJournals();
      localStorage.setItem('journalRoutes', JSON.stringify(data));
      // console.log(data);

      const url = this.router.url;
      // // const firstPartUrl = url.replace('/','').split('/')[0];
      let isUrlExists = false;
      data.forEach((journal, index) => {
        for (let subUrl of subUrls) {
          if(url == '/' + journal.code.toLowerCase() + '/' + subUrl) {
            isUrlExists = true;
          }
        }
      });
      console.log('redirecting back to original');
      if(isUrlExists){
        window.location.href = url;
      } else {
        this.router.navigate(['404']);
      }
  }

  async routeJournals() {
    const response = await this.journalService.getJournalCodes().toPromise();
    return response.data;
  }
}
