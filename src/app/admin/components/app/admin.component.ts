import { Component, OnInit } from '@angular/core';
import { state, animate } from '@angular/animations';
import { routerTransition } from '../../../animations/routerTransition';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    animations: [ routerTransition ]
})
export class AdminComponent implements OnInit {
    // change the animation state
    getRouteAnimation(outlet) {
      return outlet.activatedRouteData.depth;
    }

    ngOnInit(): void {

    }

}
