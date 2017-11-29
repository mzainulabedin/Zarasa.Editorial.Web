import { Component } from '@angular/core';
import { state, animate } from '@angular/animations';
import { routerTransition } from '../../animations/routerTransition';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, RouterModule } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { JournalRegisterComponent } from '../journal/journal-register.component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ routerTransition ]
})

export class AppComponent implements OnInit {

  constructor(private router: Router, private routerModule: RouterModule,
    private journalService: JournalService) {
  }


  async ngOnInit() {
      // console.log('app');

      // const data = await this.routeJournals();
      // console.log(data);
      // data.forEach((journal, index) => {
      //     this.router.config.push({ path: journal.code.toLowerCase() + '/register',
      //     component: JournalRegisterComponent,
      //       data: { depth: '1' } });
      //   });

      //   this.router.config.forEach((x, i) => {
      //     console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
      //   });
      //   console.log('redirecting back to original');
      //   // this.location.back();
      //   const url = this.router.url;
      //       console.log(url);
      //       this.router.navigate( [url] );
    }

    // routeJournals() {
      // this.router.config.push({ path: 'new5/register', component: JournalRegisterComponent, data: { depth: '1' } });
      // this.journalService.getJournalCodes().subscribe(result => {
      //     result.data.forEach((journal, index) => {
      //       this.router.config.push({ path: journal.code.toLowerCase() + '/register',
      //       component: JournalRegisterComponent,
      //         data: { depth: '1' } });
      //     });

      //     // this.router.config.forEach((x, i) => {
      //     //     console.log(`${i}: ${JSON.stringify(x, undefined, 1)}`);
      //     // });
      //     const url = this.router.url;
      //     console.log(url);
      //     // this.router.navigate( ['new5/register'] );
      //   }, (error: Error) => {
      //     console.log(error);
      //   });

    // }
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

        // change the animation state
    getRouteAnimation(outlet) {
      return outlet.activatedRouteData.depth;
    }
}
