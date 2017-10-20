import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('1 => 2', [
    query(':enter, :leave', style({ position: 'fixed', width: '73%' })
      , { optional: true }),
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0}))
      ], { optional: true }),
    ])
  ]),
  transition('2 => 1', [
    query(':enter, :leave', style({ position: 'fixed', width: '73%' })
      , { optional: true }),
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ], { optional: true }),
    ])
  ]),
]);
