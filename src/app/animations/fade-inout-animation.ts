import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const fadeInOutAnimation =
    trigger('fadeInOutAnimation', [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(20px)'
          }),
          animate(
            '.3s',
            style({
              opacity: 1,
              transform: 'translateY(0)'
            })
          )
        ]),
        transition(':leave', [
          style({
            opacity: 1,
            transform: 'translateY(0)'
          }),
          animate(
            '.3s',
            style({
              opacity: 0,
              transform: 'translateY(20px)'
            })
          )
        ])
    ]);
