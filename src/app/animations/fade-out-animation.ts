import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const fadeOutAnimation =
    trigger('fadeOutAnimation', [
        transition(':leave', [
          style({
            opacity: 1
          }),
          animate(
            '.2s',
            style({
              opacity: 0
            })
          )
        ])
    ]);
