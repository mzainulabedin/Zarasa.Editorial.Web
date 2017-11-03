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
import { LoginComponent } from './components/auth/login.component';
import { NavBarComponent } from './components/layouts/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/components/app/admin.component';
import { AdminHomeComponent } from './admin/components/home/admin.home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavMenuComponent,
    AlertComponent,
    ModalComponent,

    HomeComponent,
    LoginComponent,
    UserComponent,
    UserDetailComponent,
    AdminComponent,
    AdminHomeComponent,

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
    AuthGuard,
    AlertService,
    AuthService,
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
