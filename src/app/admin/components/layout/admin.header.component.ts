import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-header',
  templateUrl: './admin.header.component.html'
})

export class AdminHeaderComponent {
  @Output() someEvent = new EventEmitter<string>();
  constructor(private router: Router) {  }
  menuClick(menu) {
    this.someEvent.next(menu);
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
}
