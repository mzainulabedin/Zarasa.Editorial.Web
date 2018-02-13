import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin.layout.component.html'
})

export class AdminLayoutComponent implements OnInit {


  isDrawerOpened = true;
  drawerMode = 'side';
  title = 'Admin Layout';
  @ViewChild('sidenav') sidenav;
  constructor(
    private router: Router,
  ) {
  }
  isSidenavOpened(): boolean {
    return this.isDrawerOpened;
  }
  sidenavMode(): string {
    return this.drawerMode;
  }

  ngOnInit(): void {
    this.sidenav.close();
    if (window.screen.width <= 414) {
      this.isDrawerOpened = false;
      this.drawerMode = 'over';
    } else {
      this.isDrawerOpened = true;
      this.drawerMode = 'side';
    }
  }

  menuClick(menu: string) {
    if (menu === 'menu') {
      this.sidenav.toggle();
    }
  }
  redirect(path: string) {
    this.router.navigate([path]);
  }
  onResize(event: UIEvent) {
    if (window.innerWidth <= 414) {
      this.sidenav.close();
      this.drawerMode = 'over';
    } else {
      this.sidenav.open();
      this.drawerMode = 'side';
    }
  }
}
