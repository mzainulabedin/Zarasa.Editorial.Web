import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../../animations/fade-in-animation';



@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    animations: [fadeInAnimation]
})

export class AboutComponent  {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
}
