import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
  ngOnInit(): void {
    $('.nav a').click(function(){
      // $('.body-content').hide().fadeIn();
    });
  }

}
