import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './directives/alert.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { BsModalComponent, BsModalBodyComponent, BsModalHeaderComponent, BsModalFooterComponent, BsModalService } from 'ng2-bs3-modal';
import { ModalComponent } from './directives/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AlertComponent,
    ModalComponent,

    HomeComponent,
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    AlertService,
    UserService,
    ModalService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
