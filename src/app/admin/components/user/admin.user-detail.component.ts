import { RequestOptions } from '@angular/http';
import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { AdminUserService } from '../../services/admin.user.service';
import { AdminUser } from '../../models/admin.user';
import { EntityResponse } from '../../../common/responses/entity-response';
import { ErrorResponse } from '../../../common/responses/error-response';
import { fadeInAnimation } from '../../../animations/fade-in-animation';
import { MatSnackBar } from '@angular/material';
import { CustomSnackBarComponent } from '../../../common/components/custom.snackbar.component';



@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin.user-detail.component.html',
  styleUrls: ['./admin.user-detail.component.scss'],
  providers: [AdminUserService],
  animations: [fadeInAnimation],
})
export class AdminUserDetailComponent implements OnInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  isNewRecord: boolean;
  // public statusMessage: string;
  // public errorResponse: ErrorResponse;

  @Input() user: AdminUser;
  public id: number;

  constructor(
    private userService: AdminUserService,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
    // private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.id = +params.get('id'));
    if (this.id) {

      this.userService.getUser(this.id)
        .subscribe(entityResponse => {
          this.user = entityResponse.data;
          if (this.user == null) {
            this.isNewRecord = true;
          } else {
            this.isNewRecord = false;
          }
        });
    } else {
      this.user = new AdminUser();
      this.isNewRecord = true;
    }
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.isNewRecord) {
      if (this.user.password !== this.user.confirm_password) {
        // this.alertService.error('password and confirm password not same');
        this.snackBar.open('password and confirm password not same', '', { duration: 3000, panelClass: 'error-alert' });
        return;
      }
      // add the record
      this.userService.insert(this.user).subscribe((entityResponse: EntityResponse<AdminUser>) => {
        this.user = entityResponse.data;
        this.snackBar.openFromComponent(CustomSnackBarComponent
          , { duration: 2000, panelClass: 'success-alert', announcementMessage: entityResponse.message })
          .afterDismissed().subscribe(() => {
            this.location.back();
          });
        this.isNewRecord = false;
      }, (error: Error) => {
        this.snackBar.open(error.message, '', { duration: 3000, panelClass: 'error-alert' });
      });
    } else {
      // edit the record
      this.userService.update(this.user).subscribe((entityResponse: EntityResponse<AdminUser>) => {
        this.user = entityResponse.data;
        this.snackBar.openFromComponent(CustomSnackBarComponent
          , { duration: 2000, panelClass: 'success-alert', announcementMessage: entityResponse.message })
          .afterDismissed().subscribe(() => {
            this.location.back();
          });
      }, (error: Error) => {
        this.snackBar.open(error.message, '', { duration: 3000, panelClass: 'error-alert' });
      });
    }

  }
}
