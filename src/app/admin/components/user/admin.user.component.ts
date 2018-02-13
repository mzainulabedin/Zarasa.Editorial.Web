import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../animations/fade-in-animation';
import { AdminUserService } from '../../services/admin.user.service';
import { AdminUser } from '../../models/admin.user';
import { Router } from '@angular/router';
import { Sort, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../common/components/confirmation.dialog.component';
import { EntityResponse } from '../../../common/responses/entity-response';
import { CustomSnackBarComponent } from '../../../common/components/custom.snackbar.component';
import { Location } from '@angular/common';


@Component ({
  selector: 'app-admin-user',
  templateUrl: './admin.user.component.html',
  styleUrls: [ './admin.user.component.scss' ],
  animations: [fadeInAnimation],
  providers: [AdminUserService],
})

export class AdminUserComponent implements OnInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  title = 'User Management';
  users: AdminUser[];
  selectedId: number;

  pageNumber: number;
  pageSize = 3;
  totalRecords: number;

  searchText: string;
  orderBy: string;
  orderByDirection: string;

  constructor(private userService: AdminUserService, private router: Router,
    private dialog: MatDialog, private snackBar: MatSnackBar, private location: Location) {
  }

  ngOnInit(): void {
    this.getUsers(0, this.pageSize);
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/admin/user-detail', id]);
  }
  getUsers(page: number, size: number, searchString: string = '', orderBy: string = '', orderByDirection: string = ''): void {
    this.userService.getUsers(page + 1, size, searchString, orderBy, orderByDirection).subscribe(result => {
      this.users = result.data;
      this.pageNumber = result.pageNumber - 1;
      this.pageSize = result.pageSize;
      this.totalRecords = result.totalRecords;
    });
}


  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this record?' }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userService.remove(id).subscribe((entityResponse: EntityResponse<AdminUser>) => {
          this.snackBar.openFromComponent(CustomSnackBarComponent,
            { duration: 2000, panelClass: 'success-alert', announcementMessage: entityResponse.message });
          this.getUsers(0, this.pageSize);
        }, (error: Error) => {
          this.snackBar.openFromComponent(CustomSnackBarComponent,
            { duration: 2000, panelClass: 'success-alert', announcementMessage: error.message });
        });
      }
    });
  }

  currentPageChanged(event: any): void {
    this.getUsers(event.pageIndex, event.pageSize, this.searchText, this.orderBy, this.orderByDirection);
  }

  search(): void {
    this.getUsers(0, this.pageSize, this.searchText);
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.getUsers(this.pageNumber, this.pageSize, this.searchText, '', '');
    } else {
      this.getUsers(this.pageNumber, this.pageSize, this.searchText, sort.active, sort.direction);
    }

  }
}
