import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
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
        ])
    ]);
