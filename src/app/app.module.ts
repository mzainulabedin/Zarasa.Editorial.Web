import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DOCUMENT } from '@angular/platform-browser';
import { CustomSnackBarComponent } from './common/components/custom.snackbar.component';
import { ErrorSnackBarComponent } from './common/components/error.snackbar.component';
import { ConfirmationDialogComponent } from './common/components/confirmation.dialog.component';

import { MatToolbarModule, MatDialog } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { RootLayoutComponent } from './layout/root.layout.component';
import { HomeComponent } from './website/components/home/home.component';
import { AboutComponent } from './website/components/about/about.component';
import { WebLayoutComponent } from './website/components/layout/web.layout.component';
import { JournalComponent } from './website/components/journal/journal.component';
import { AuthService } from './common/services/auth.service';
import { JournalService } from './website/services/journal.service';
import { LoginComponent } from './website/components/auth/login.component';
import { AdminLayoutComponent } from './admin/components/layout/admin.layout.component';
import { AdminHeaderComponent } from './admin/components/layout/admin.header.component';
import { AdminDrawerComponent } from './admin/components/layout/admin.drawer.component';
import { AdminHomeComponent } from './admin/components/home/admin.home.component';
import { AdminFooterComponent } from './admin/components/layout/admin.footer.component';
import { AdminUserComponent } from './admin/components/user/admin.user.component';
import { AdminUserDetailComponent } from './admin/components/user/admin.user-detail.component';

import { AdminJournalComponent } from './admin/components/journal/admin.journal.component';
import { AuthGuard } from './auth.guard';
import { JournalRequestComponent } from './website/components/journal/journal-request.component';
import { NavigatorComponent } from './common/components/navigator.component';
import { JournalRegisterComponent } from './website/components/journal/journal-register.component';
import { Error404Component } from './common/components/error.404.component';




@NgModule({
  declarations: [
    NavigatorComponent,
    Error404Component,

    CustomSnackBarComponent,
    ErrorSnackBarComponent,
    ConfirmationDialogComponent,

    RootLayoutComponent,
    HomeComponent,
    AboutComponent,
    JournalComponent,
    LoginComponent,
    WebLayoutComponent,
    AdminLayoutComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminDrawerComponent,
    AdminFooterComponent,
    AdminUserComponent,
    AdminUserDetailComponent,
    AdminJournalComponent,
    JournalRequestComponent,
    JournalRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatDialogModule,
    MatTableModule
  ],

  providers: [
    AuthService,
    JournalService,
    AuthGuard
  ],

  bootstrap: [
    RootLayoutComponent
  ],

  entryComponents: [
    CustomSnackBarComponent,
    ConfirmationDialogComponent,
    ErrorSnackBarComponent,
    NavigatorComponent,
    JournalRegisterComponent
  ]
})
export class AppModule implements OnInit {
  constructor (
    @Inject( DOCUMENT ) private document) {
    }

  ngOnInit(): void {
    console.log('working...');
    this.document.body.className = 'skin-blue';
  }
}
