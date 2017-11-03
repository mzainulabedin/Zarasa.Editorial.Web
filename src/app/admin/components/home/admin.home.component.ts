import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../../animations/fade-in-animation';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin.home.component.html',
    animations: [fadeInAnimation]
})

export class AdminHomeComponent  {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
}
