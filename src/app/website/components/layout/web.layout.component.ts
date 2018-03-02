import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';



@Component({
  selector: 'app-web-layout',
  templateUrl: './web.layout.component.html',
  styleUrls: ['./web.layout.component.css']
})

export class WebLayoutComponent {
  title = 'Web Layout';

  constructor(
    private router: Router,
  ) {
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
}
