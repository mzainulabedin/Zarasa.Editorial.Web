import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations/fade-in-animation';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    animations: [fadeInAnimation]
})

export class HomeComponent  {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
}
