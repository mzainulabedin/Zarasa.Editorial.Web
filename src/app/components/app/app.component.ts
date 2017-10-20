import { Component } from '@angular/core';
import { state, animate } from '@angular/animations';
import { routerTransition } from '../../animations/routerTransition';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ routerTransition ]
})
export class AppComponent {
    // change the animation state
    getRouteAnimation(outlet) {
      return outlet.activatedRouteData.depth;
    }
}
